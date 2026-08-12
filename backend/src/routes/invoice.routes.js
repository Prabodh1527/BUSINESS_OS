import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Define Invoice Schema
const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String },
    },
    businessType: { type: String, default: "SERVICE" },
    items: [
      {
        inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
        sku: String,
        name: String,
        quantity: { type: Number, default: 1 },
        unitPrice: { type: Number, default: 0 },
        taxRate: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
      },
    ],
    subtotal: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    dueDate: { type: String },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["PENDING", "PARTIAL", "PAID", "CANCELLED", "OVERDUE"],
      default: "PENDING",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Helper function to bind Invoice model to dynamic tenant database
const getTenantInvoiceModel = (tenantDb) => {
  if (!tenantDb) {
    throw new Error("Tenant database connection missing from request context.");
  }
  return tenantDb.models.Invoice || tenantDb.model("Invoice", invoiceSchema);
};

// Helper function to bind Inventory model to dynamic tenant database
const getTenantInventoryModel = (tenantDb) => {
  if (!tenantDb) {
    throw new Error("Tenant database connection missing from request context.");
  }
  const inventorySchema = new mongoose.Schema({
    sku: String,
    name: String,
    unitPrice: Number,
    stockQuantity: Number,
  });
  return tenantDb.models.Inventory || tenantDb.model("Inventory", inventorySchema);
};

// Helper to create Nodemailer transporter
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Helper to format date string cleanly
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toString();
};

// Protect all billing/invoice routes & inject req.tenantDb
router.use(protect);

// ==========================================
// 1. GET ALL INVOICES & DYNAMIC STATS
// GET http://localhost:5000/api/invoices
// ==========================================
router.get("/", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    const totalInvoices = invoices.length;

    let totalRevenue = 0;
    let paidCount = 0;
    let pendingCount = 0;

    invoices.forEach((inv) => {
      const invoiceTotal = Number(inv.grandTotal) || 0;
      const collectedPayment = Number(inv.amountPaid) || 0;

      totalRevenue += invoiceTotal - collectedPayment;

      if (inv.status === "PAID") {
        paidCount++;
      } else {
        pendingCount++;
      }
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalInvoices,
        totalRevenue: Math.max(0, Math.round(totalRevenue * 100) / 100),
        paidCount,
        pendingCount,
      },
      invoices,
      data: invoices,
    });
  } catch (error) {
    console.error("❌ Error fetching invoices:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. CREATE INVOICE & AUTOMATICALLY DEDUCT STOCK
// POST http://localhost:5000/api/invoices
// ==========================================
router.post("/", async (req, res) => {
  console.log("📥 Incoming Invoice Payload:", req.body);
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const Inventory = getTenantInventoryModel(req.tenantDb);

    const {
      customer,
      businessType,
      items,
      discountTotal = 0,
      currency = "INR",
      dueDate,
      notes,
    } = req.body;

    // Handle string or object payload for customer name
    const customerName = typeof customer === "string" ? customer : customer?.name;

    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer name and at least one item are required.",
      });
    }

    const customerObj = typeof customer === "string" ? { name: customer } : customer;

    let subtotal = 0;
    let taxTotal = 0;

    const processedItems = items.map((item) => {
      const itemSubtotal = (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0);
      const itemTax = (itemSubtotal * (Number(item.taxRate) || 0)) / 100;
      const itemTotal = itemSubtotal + itemTax;

      subtotal += itemSubtotal;
      taxTotal += itemTax;

      return {
        ...item,
        total: itemTotal,
      };
    });

    const grandTotal = subtotal + taxTotal - Number(discountTotal);
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const invoiceNumber = `INV-${randomSuffix}`;

    // 1. Create the new Invoice in Tenant DB
    const newInvoice = await Invoice.create({
      invoiceNumber,
      customer: customerObj,
      businessType: businessType || "SERVICE",
      items: processedItems,
      subtotal,
      taxTotal,
      discountTotal: Number(discountTotal),
      grandTotal,
      amountPaid: 0,
      balanceDue: grandTotal,
      currency,
      dueDate: dueDate || null,
      notes: notes || "",
      status: "PENDING",
      userId: req.user?._id,
    });

    // 2. Deduct inventory stock for each line item
    for (const item of items) {
      const targetId = item._id || item.inventoryId || item.id;
      const targetSku = item.sku;

      let searchFilter = null;
      if (targetId && mongoose.Types.ObjectId.isValid(targetId)) {
        searchFilter = { _id: targetId };
      } else if (targetSku) {
        searchFilter = { sku: targetSku };
      } else if (item.name) {
        searchFilter = { name: item.name };
      }

      if (searchFilter) {
        const qtyToDeduct = Number(item.quantity) || 1;
        await Inventory.findOneAndUpdate(
          searchFilter,
          { $inc: { stockQuantity: -qtyToDeduct } }
        );
      }
    }

    console.log(`✅ Invoice Created & Stock Deducted in Tenant DB (${req.tenantDbName})`);

    // 3. Send automatic email notification if recipient email exists
    if (customerObj?.email && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter();
        if (transporter) {
          const formattedDueDate = formatDate(dueDate);

          const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px;">
              <div style="max-width: 550px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px; background-color: #ffffff;">
                <h2 style="color: #4F46E5; margin: 0 0 5px 0; font-size: 20px; font-weight: bold;">BUSINESS OS</h2>
                <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; font-weight: bold;">New Invoice Statement</h3>
                
                <p style="margin: 0 0 15px 0; color: #334155; font-size: 14px;">Dear <strong>${customerObj.name}</strong>,</p>
                <p style="margin: 0 0 20px 0; color: #334155; font-size: 14px;">A new invoice <strong>#${newInvoice.invoiceNumber}</strong> has been generated for you.</p>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f8fafc; border-radius: 6px; font-size: 14px;">
                  <tr>
                    <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Invoice Number:</td>
                    <td style="padding: 12px 16px; text-align: right; color: #334155;">${newInvoice.invoiceNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Due Date:</td>
                    <td style="padding: 12px 16px; text-align: right; color: #334155;">${formattedDueDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Grand Total:</td>
                    <td style="padding: 12px 16px; text-align: right; color: #0f172a; font-weight: bold;">₹${grandTotal}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Balance Due:</td>
                    <td style="padding: 12px 16px; text-align: right; color: #dc2626; font-weight: bold;">₹${grandTotal}</td>
                  </tr>
                </table>

                <p style="margin: 0 0 25px 0; color: #475569; font-size: 14px;">Please arrange for payment by the due date.</p>
                <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0 0 20px 0;" />
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">If you have any questions, reply directly to this email.</p>
              </div>
            </div>
          `;

          await transporter.sendMail({
            from: `"Business OS" <${process.env.SMTP_USER}>`,
            to: customerObj.email,
            subject: `New Invoice Generated: #${newInvoice.invoiceNumber}`,
            html: htmlContent,
          });

          console.log("📧 Invoice email sent successfully to:", customerObj.email);
        }
      } catch (mailErr) {
        console.error("⚠️ Email error:", mailErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: `Invoice #${newInvoice.invoiceNumber} generated and stock updated!`,
      invoice: newInvoice,
      data: newInvoice,
    });
  } catch (error) {
    console.error("❌ Invoice Creation Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 3. LOG PAYMENT FOR AN INVOICE
// POST http://localhost:5000/api/invoices/:id/payment
// ==========================================
router.post("/:id/payment", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const { amount } = req.body;
    const paymentAmount = Number(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      return res.status(400).json({ success: false, message: "Valid payment amount is required" });
    }

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found in tenant database" });
    }

    const newAmountPaid = (Number(invoice.amountPaid) || 0) + paymentAmount;
    const newBalanceDue = Math.max(0, Number(invoice.grandTotal) - newAmountPaid);

    invoice.amountPaid = newAmountPaid;
    invoice.balanceDue = newBalanceDue;
    invoice.status = newBalanceDue === 0 ? "PAID" : "PARTIAL";

    await invoice.save();

    console.log(`💳 Payment recorded for ${invoice.invoiceNumber}: ₹${paymentAmount}`);

    return res.status(200).json({
      success: true,
      message: `Payment of ₹${paymentAmount} recorded successfully!`,
      invoice,
      data: invoice,
    });
  } catch (error) {
    console.error("❌ Log Payment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Direct endpoint handler for body-based invoiceId requests
router.post("/payment", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const { invoiceId, id, amount } = req.body;
    const targetId = invoiceId || id;
    const paymentAmount = Number(amount);

    if (!targetId) {
      return res.status(400).json({ success: false, message: "Invoice ID is required" });
    }

    if (!paymentAmount || paymentAmount <= 0) {
      return res.status(400).json({ success: false, message: "Valid payment amount is required" });
    }

    const invoice = await Invoice.findById(targetId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found in tenant database" });
    }

    const newAmountPaid = (Number(invoice.amountPaid) || 0) + paymentAmount;
    const newBalanceDue = Math.max(0, Number(invoice.grandTotal) - newAmountPaid);

    invoice.amountPaid = newAmountPaid;
    invoice.balanceDue = newBalanceDue;
    invoice.status = newBalanceDue === 0 ? "PAID" : "PARTIAL";

    await invoice.save();

    return res.status(200).json({
      success: true,
      message: `Payment of ₹${paymentAmount} recorded successfully!`,
      invoice,
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 4. UPDATE INVOICE STATUS
// PATCH http://localhost:5000/api/invoices/:id/status
// ==========================================
router.patch("/:id/status", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const { status } = req.body;
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found in tenant database" });
    }

    invoice.status = status;
    if (status === "PAID") {
      invoice.balanceDue = 0;
      invoice.amountPaid = invoice.grandTotal;
    } else if (status === "PENDING") {
      invoice.balanceDue = invoice.grandTotal;
      invoice.amountPaid = 0;
    }

    await invoice.save();

    return res.status(200).json({
      success: true,
      message: `Invoice status updated to ${status}`,
      invoice,
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 5. DELETE INVOICE
// DELETE http://localhost:5000/api/invoices/:id
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!deletedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found in tenant database" });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ==========================================
// MONGOOSE SCHEMAS FOR TENANT BINDING
// ==========================================

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

const inventorySchema = new mongoose.Schema({
  sku: String,
  category: String,
  name: String,
  unitPrice: { type: Number, default: 0 },
  taxRate: { type: Number, default: 0 },
  stockQuantity: { type: Number, default: 0 },
  lowStockLimit: { type: Number, default: 5 },
});

// ==========================================
// TENANT HELPER BINDINGS
// ==========================================

const getTenantInvoiceModel = (tenantDb) => {
  if (!tenantDb) {
    throw new Error("Tenant database connection missing from request context.");
  }
  return tenantDb.models.Invoice || tenantDb.model("Invoice", invoiceSchema);
};

const getTenantInventoryModel = (tenantDb) => {
  if (!tenantDb) {
    throw new Error("Tenant database connection missing from request context.");
  }
  return tenantDb.models.Inventory || tenantDb.model("Inventory", inventorySchema);
};

// ==========================================
// UTILITY & EMAIL HELPERS
// ==========================================

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

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-IN");
};

const sendPaymentReceiptEmail = async (invoice, paymentAmount) => {
  if (!invoice.customer?.email || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return;
  }

  try {
    const transporter = createTransporter();
    if (!transporter) return;

    const isFullyPaid = invoice.status === "PAID";
    const emailSubject = isFullyPaid
      ? `Payment Received - Invoice #${invoice.invoiceNumber} Fully Paid`
      : `Partial Payment Receipt - Invoice #${invoice.invoiceNumber}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px;">
        <div style="max-width: 550px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px; background-color: #ffffff;">
          <h2 style="color: #4F46E5; margin: 0 0 5px 0; font-size: 20px; font-weight: bold;">BUSINESS OS</h2>
          <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; font-weight: bold;">Payment Confirmation Receipt</h3>
          
          <p style="margin: 0 0 15px 0; color: #334155; font-size: 14px;">Dear <strong>${invoice.customer.name}</strong>,</p>
          <p style="margin: 0 0 20px 0; color: #334155; font-size: 14px;">
            We have received a payment of <strong>₹${paymentAmount.toLocaleString("en-IN")}</strong> for Invoice <strong>#${invoice.invoiceNumber}</strong>.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f8fafc; border-radius: 6px; font-size: 14px;">
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Grand Total:</td>
              <td style="padding: 12px 16px; text-align: right; color: #334155;">₹${invoice.grandTotal.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Payment Made Now:</td>
              <td style="padding: 12px 16px; text-align: right; color: #10B981; font-weight: bold;">₹${paymentAmount.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Total Paid To Date:</td>
              <td style="padding: 12px 16px; text-align: right; color: #334155;">₹${invoice.amountPaid.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Remaining Balance:</td>
              <td style="padding: 12px 16px; text-align: right; color: ${isFullyPaid ? "#10B981" : "#dc2626"}; font-weight: bold;">
                ₹${invoice.balanceDue.toLocaleString("en-IN")}
              </td>
            </tr>
          </table>

          ${
            isFullyPaid
              ? '<p style="margin: 0 0 25px 0; color: #10B981; font-size: 14px; font-weight: bold;">Your invoice is now fully settled. Thank you for your payment!</p>'
              : `<p style="margin: 0 0 25px 0; color: #475569; font-size: 14px;">Please clear the remaining balance of <strong>₹${invoice.balanceDue.toLocaleString("en-IN")}</strong> by the due date.</p>`
          }

          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0 0 20px 0;" />
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">If you have any questions, reply directly to this email.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Business OS" <${process.env.SMTP_USER}>`,
      to: invoice.customer.email,
      subject: emailSubject,
      html: htmlContent,
    });

    console.log("📧 Payment receipt email sent to:", invoice.customer.email);
  } catch (mailErr) {
    console.error("⚠️ Email receipt error:", mailErr.message);
  }
};

const sendLowStockAlertEmail = async (adminUser, inventoryItem) => {
  const recipientEmail = adminUser?.email || process.env.SMTP_USER;
  if (!recipientEmail || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return;
  }

  try {
    const transporter = createTransporter();
    if (!transporter) return;

    const limit = inventoryItem.lowStockLimit ?? inventoryItem.minStock ?? 5;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px;">
        <div style="max-width: 550px; margin: 0 auto; border: 1px solid #fee2e2; border-radius: 8px; padding: 30px; background-color: #fff5f5;">
          <h2 style="color: #dc2626; margin: 0 0 5px 0; font-size: 20px; font-weight: bold;">⚠️ LOW STOCK WARNING</h2>
          <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px;">Business OS Inventory Alert</h3>
          
          <p style="margin: 0 0 15px 0; color: #334155; font-size: 14px;">Hello <strong>${adminUser?.name || "Admin"}</strong>,</p>
          <p style="margin: 0 0 20px 0; color: #334155; font-size: 14px;">
            Stock for <strong>${inventoryItem.name}</strong> has dropped to or below its configured limit.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #ffffff; border-radius: 6px; font-size: 14px; border: 1px solid #fecaca;">
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold; border-bottom: 1px solid #fee2e2;">Product Name:</td>
              <td style="padding: 12px 16px; text-align: right; color: #334155; border-bottom: 1px solid #fee2e2;">${inventoryItem.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold; border-bottom: 1px solid #fee2e2;">SKU:</td>
              <td style="padding: 12px 16px; text-align: right; color: #334155; border-bottom: 1px solid #fee2e2;">${inventoryItem.sku || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold; border-bottom: 1px solid #fee2e2;">Current Stock:</td>
              <td style="padding: 12px 16px; text-align: right; color: #dc2626; font-weight: bold; border-bottom: 1px solid #fee2e2;">${inventoryItem.stockQuantity} units</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #1e293b; font-weight: bold;">Configured Limit:</td>
              <td style="padding: 12px 16px; text-align: right; color: #334155;">${limit} units</td>
            </tr>
          </table>

          <p style="margin: 0 0 25px 0; color: #475569; font-size: 14px;">Please reorder or update your inventory levels.</p>
          <hr style="border: none; border-top: 1px solid #fee2e2; margin: 0 0 20px 0;" />
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">Business OS Inventory System</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Business OS Alerts" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `⚠️ Low Stock Alert: ${inventoryItem.name} (${inventoryItem.stockQuantity} left)`,
      html: htmlContent,
    });

    console.log(`📧 Low stock alert sent to ${recipientEmail} for: ${inventoryItem.name}`);
  } catch (err) {
    console.error("⚠️ Low stock alert email error:", err.message);
  }
};

// Protect all routes
router.use(protect);

// ==========================================
// 1. GET ALL INVOICES & STATS
// GET /api/invoices
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
      const collectedPayment = Number(inv.amountPaid) || 0;
      totalRevenue += collectedPayment;

      if (inv.status === "PAID") {
        paidCount++;
      } else if (inv.status !== "CANCELLED") {
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
// 2. GET SINGLE INVOICE BY ID
// GET /api/invoices/:id
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    return res.status(200).json({
      success: true,
      invoice,
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 3. CREATE INVOICE & DEDUCT INVENTORY STOCK
// POST /api/invoices
// ==========================================
router.post("/", async (req, res) => {
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

    const grandTotal = Math.round((subtotal + taxTotal - Number(discountTotal)) * 100) / 100;
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const invoiceNumber = `INV-${randomSuffix}`;

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

    // Deduct stock for items
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
        const updatedInventoryItem = await Inventory.findOneAndUpdate(
          searchFilter,
          { $inc: { stockQuantity: -qtyToDeduct } },
          { new: true }
        );

        if (updatedInventoryItem) {
          const threshold = updatedInventoryItem.lowStockLimit ?? updatedInventoryItem.minStock ?? 5;
          if (updatedInventoryItem.stockQuantity <= threshold) {
            await sendLowStockAlertEmail(req.user, updatedInventoryItem);
          }
        }
      }
    }

    // Send initial invoice statement email
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
        }
      } catch (mailErr) {
        console.error("⚠️ Email error:", mailErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: `Invoice #${newInvoice.invoiceNumber} generated!`,
      invoice: newInvoice,
      data: newInvoice,
    });
  } catch (error) {
    console.error("❌ Invoice Creation Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 4. LOG PAYMENT FOR AN INVOICE
// POST /api/invoices/:id/payment & /api/invoices/payment
// ==========================================
const handlePaymentLogic = async (req, res, targetId, amount) => {
  const Invoice = getTenantInvoiceModel(req.tenantDb);
  const paymentAmount = Number(amount);

  if (!paymentAmount || paymentAmount <= 0) {
    return res.status(400).json({ success: false, message: "Valid payment amount is required" });
  }

  const invoice = await Invoice.findById(targetId);
  if (!invoice) {
    return res.status(404).json({ success: false, message: "Invoice not found" });
  }

  const newAmountPaid = (Number(invoice.amountPaid) || 0) + paymentAmount;
  const newBalanceDue = Math.max(0, Number(invoice.grandTotal) - newAmountPaid);

  invoice.amountPaid = newAmountPaid;
  invoice.balanceDue = newBalanceDue;
  invoice.status = newBalanceDue === 0 ? "PAID" : "PARTIAL";

  await invoice.save();

  await sendPaymentReceiptEmail(invoice, paymentAmount);

  return res.status(200).json({
    success: true,
    message: `Payment of ₹${paymentAmount} recorded successfully!`,
    invoice,
    data: invoice,
  });
};

router.post("/:id/payment", async (req, res) => {
  try {
    return await handlePaymentLogic(req, res, req.params.id, req.body.amount);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/payment", async (req, res) => {
  try {
    const { invoiceId, id, amount } = req.body;
    const targetId = invoiceId || id;
    if (!targetId) {
      return res.status(400).json({ success: false, message: "Invoice ID is required" });
    }
    return await handlePaymentLogic(req, res, targetId, amount);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 5. UPDATE INVOICE STATUS
// PATCH /api/invoices/:id/status
// ==========================================
router.patch("/:id/status", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const { status } = req.body;
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    const previousStatus = invoice.status;
    invoice.status = status;

    if (status === "PAID") {
      const paymentDifference = invoice.grandTotal - (invoice.amountPaid || 0);
      invoice.balanceDue = 0;
      invoice.amountPaid = invoice.grandTotal;

      if (previousStatus !== "PAID" && paymentDifference > 0) {
        await sendPaymentReceiptEmail(invoice, paymentDifference);
      }
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
// 6. DELETE INVOICE
// DELETE /api/invoices/:id
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const Invoice = getTenantInvoiceModel(req.tenantDb);
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!deletedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
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
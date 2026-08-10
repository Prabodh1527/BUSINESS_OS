import express from "express";
import nodemailer from "nodemailer";
import Invoice from "../models/invoice.model.js";

const router = express.Router();

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

// ==========================================
// 1. GET ALL INVOICES & DYNAMIC STATS
// GET http://localhost:5000/api/invoices
// ==========================================
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    const totalInvoices = invoices.length;

    let totalRevenue = 0;
    let paidCount = 0;
    let pendingCount = 0;

    invoices.forEach((inv) => {
      // Calculate total invoiced revenue dynamically
      totalRevenue += Number(inv.grandTotal) || 0;

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
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        paidCount,
        pendingCount,
      },
      invoices,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. CREATE INVOICE & AUTO EMAIL
// POST http://localhost:5000/api/invoices
// ==========================================
router.post("/", async (req, res) => {
  console.log("📥 Incoming Invoice Payload:", req.body);
  try {
    const {
      customer,
      businessType,
      items,
      discountTotal = 0,
      currency = "INR",
      dueDate,
      notes,
    } = req.body;

    if (!customer?.name || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer name and at least one item are required.",
      });
    }

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

    const newInvoice = await Invoice.create({
      invoiceNumber,
      customer,
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
    });

    console.log("✅ Invoice Saved to Database:", newInvoice._id);

    // Send formatted email
    if (customer?.email && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter();
        if (transporter) {
          const formattedDueDate = formatDate(dueDate);

          const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px;">
              <div style="max-width: 550px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px; background-color: #ffffff;">
                <h2 style="color: #4F46E5; margin: 0 0 5px 0; font-size: 20px; font-weight: bold;">BUSINESS OS</h2>
                <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; font-weight: bold;">New Invoice Statement</h3>
                
                <p style="margin: 0 0 15px 0; color: #334155; font-size: 14px;">Dear <strong>${customer.name}</strong> ,</p>
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
            to: customer.email,
            subject: `New Invoice Generated: #${newInvoice.invoiceNumber}`,
            html: htmlContent,
          });

          console.log("📧 Invoice email sent successfully to:", customer.email);
        }
      } catch (mailErr) {
        console.error("⚠️ Email error:", mailErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: `Invoice #${newInvoice.invoiceNumber} generated successfully!`,
      invoice: newInvoice,
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
    const { amount } = req.body;
    const paymentAmount = Number(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      return res.status(400).json({ success: false, message: "Valid payment amount is required" });
    }

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    // Accumulate payment
    const newAmountPaid = (Number(invoice.amountPaid) || 0) + paymentAmount;
    const newBalanceDue = Math.max(0, Number(invoice.grandTotal) - newAmountPaid);

    invoice.amountPaid = newAmountPaid;
    invoice.balanceDue = newBalanceDue;

    if (newBalanceDue === 0) {
      invoice.status = "PAID";
    } else {
      invoice.status = "PARTIAL";
    }

    await invoice.save();

    console.log(`💳 Payment recorded for ${invoice.invoiceNumber}: ₹${paymentAmount}`);

    return res.status(200).json({
      success: true,
      message: `Payment of ₹${paymentAmount} recorded successfully!`,
      invoice,
    });
  } catch (error) {
    console.error("❌ Log Payment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Direct endpoint handler for body-based invoiceId requests
router.post("/payment", async (req, res) => {
  const { invoiceId, id, amount } = req.body;
  const targetId = invoiceId || id;

  if (!targetId) {
    return res.status(400).json({ success: false, message: "Invoice ID is required" });
  }

  req.params.id = targetId;
  req.body.amount = amount;
  
  // Forward internally to the main payment handler
  try {
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

    return res.status(200).json({
      success: true,
      message: `Payment of ₹${paymentAmount} recorded successfully!`,
      invoice,
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
    const { status } = req.body;
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
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
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
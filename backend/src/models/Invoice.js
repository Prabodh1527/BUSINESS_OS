import express from 'express';
import Invoice from '../models/Invoice.js';

const router = express.Router();

// GET: Fetch all invoices + stats
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });

    const totalInvoices = invoices.length;
    let totalRevenue = 0;
    let paidCount = 0;
    let pendingCount = 0;

    invoices.forEach((inv) => {
      totalRevenue += inv.amountPaid || 0;
      if (inv.status === "PAID") {
        paidCount++;
      } else if (inv.status === "PENDING" || inv.status === "PARTIAL" || inv.status === "OVERDUE") {
        pendingCount++;
      }
    });

    res.status(200).json({
      success: true,
      invoices,
      stats: {
        totalInvoices,
        totalRevenue,
        paidCount,
        pendingCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST: Create invoice
router.post("/", async (req, res) => {
  try {
    const count = await Invoice.countDocuments();
    const invoiceNumber = `INV-${1001 + count}`;

    const newInvoice = new Invoice({
      ...req.body,
      invoiceNumber,
    });

    await newInvoice.save();
    res.status(201).json({ success: true, invoice: newInvoice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH: Record Payment
router.patch("/:id/payment", async (req, res) => {
  try {
    const { amountPaid, balanceDue, status } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          amountPaid,
          balanceDue,
          status,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({
      success: true,
      message: "Payment recorded successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH: Update Status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, invoice: updatedInvoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
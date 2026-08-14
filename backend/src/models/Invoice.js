import express from "express";
import invoiceSchema from "../models/Invoice.js";

const router = express.Router();

// Helper function to resolve the Invoice model dynamically for the active tenant DB
const getInvoiceModel = (req) => {
  if (!req.tenantDb) {
    throw new Error("Tenant database instance missing in request context.");
  }
  return req.tenantDb.models.Invoice || req.tenantDb.model("Invoice", invoiceSchema);
};

// @route   GET /api/invoices
// @desc    Fetch all invoices + dashboard stats
router.get("/", async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
    const invoices = await Invoice.find().sort({ createdAt: -1 });

    const totalInvoices = invoices.length;
    let totalRevenue = 0;
    let paidCount = 0;
    let pendingCount = 0;

    invoices.forEach((inv) => {
      totalRevenue += inv.amountPaid || 0;
      if (inv.status === "PAID") {
        paidCount++;
      } else if (
        inv.status === "PENDING" ||
        inv.status === "PARTIAL" ||
        inv.status === "OVERDUE"
      ) {
        pendingCount++;
      }
    });

    return res.status(200).json({
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
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/invoices/:id
// @desc    Get single invoice by ID
router.get("/:id", async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    return res.status(200).json({ success: true, invoice });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/invoices
// @desc    Create new invoice
router.post("/", async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);

    // Generate unique invoice number if not explicitly passed
    let invoiceNumber = req.body.invoiceNumber;
    if (!invoiceNumber) {
      const count = await Invoice.countDocuments();
      invoiceNumber = `INV-${1001 + count}`;
    }

    const newInvoice = new Invoice({
      ...req.body,
      invoiceNumber,
      createdBy: req.user?._id,
    });

    await newInvoice.save();
    return res.status(201).json({ success: true, invoice: newInvoice });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/invoices/:id
// @desc    Update full invoice details
router.put("/:id", async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PATCH /api/invoices/:id/payment
// @desc    Record invoice payment
router.patch("/:id/payment", async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
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

    return res.status(200).json({
      success: true,
      message: "Payment recorded successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PATCH /api/invoices/:id/status
// @desc    Update invoice status
router.patch("/:id/status", async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
    const { status } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    return res.status(200).json({ success: true, invoice: updatedInvoice });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/invoices/:id
// @desc    Delete an invoice
router.delete("/:id", async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
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
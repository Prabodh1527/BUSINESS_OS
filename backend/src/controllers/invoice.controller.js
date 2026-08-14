import invoiceSchema from "../models/Invoice.js"; // Standard Invoice Mongoose Schema

// Helper to get Tenant-Specific Invoice Model
const getInvoiceModel = (req) => {
  if (!req.tenantDb) {
    throw new Error("Tenant database instance is missing from the request context.");
  }
  // Registers/retrieves the model inside the tenant's separate database connection
  return req.tenantDb.models.Invoice || req.tenantDb.model("Invoice", invoiceSchema);
};

// @desc    Get all invoices for current logged-in tenant
// @route   GET /api/invoices
export const getInvoices = async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
    const invoices = await Invoice.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error("Get Invoices Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve invoices.",
    });
  }
};

// @desc    Create a new invoice in tenant DB
// @route   POST /api/invoices
export const createInvoice = async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);

    const newInvoice = await Invoice.create({
      ...req.body,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully!",
      data: newInvoice,
    });
  } catch (error) {
    console.error("Create Invoice Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create invoice.",
    });
  }
};

// @desc    Get single invoice by ID
// @route   GET /api/invoices/:id
export const getInvoiceById = async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Get Invoice By ID Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch invoice.",
    });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
export const deleteInvoice = async (req, res) => {
  try {
    const Invoice = getInvoiceModel(req);
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully!",
    });
  } catch (error) {
    console.error("Delete Invoice Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete invoice.",
    });
  }
};
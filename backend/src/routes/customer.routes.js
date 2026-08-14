import express from 'express';
import mongoose from 'mongoose';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// ==========================================
// MONGOOSE SCHEMA FOR CUSTOMERS
// ==========================================
const customerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, default: '' },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      postalCode: { type: String, default: '' },
      country: { type: String, default: 'India' },
    },
    gstin: { type: String, default: '' }, // For tax/compliance
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Helper to bind Model to dynamic tenant DB connection
const getTenantCustomerModel = (tenantDb) => {
  if (!tenantDb) {
    throw new Error('Tenant database connection missing from request context.');
  }
  return tenantDb.models.Customer || tenantDb.model('Customer', customerSchema);
};

// Protect all routes
router.use(protect);

// ==========================================
// 1. GET ALL CUSTOMERS
// GET /api/customers
// ==========================================
router.get('/', async (req, res) => {
  try {
    const Customer = getTenantCustomerModel(req.tenantDb);
    const customers = await Customer.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
      data: customers,
    });
  } catch (error) {
    console.error('❌ Error fetching customers:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve customers.',
    });
  }
});

// ==========================================
// 2. GET SINGLE CUSTOMER BY ID
// GET /api/customers/:id
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const Customer = getTenantCustomerModel(req.tenantDb);
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({
      success: true,
      customer,
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 3. CREATE NEW CUSTOMER
// POST /api/customers
// ==========================================
router.post('/', async (req, res) => {
  try {
    const Customer = getTenantCustomerModel(req.tenantDb);
    const { name, email, phone, company, address, gstin, notes } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Customer name is required' });
    }

    const newCustomer = await Customer.create({
      userId: req.user?._id || req.user?.id,
      name,
      email,
      phone,
      company,
      address,
      gstin,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      customer: newCustomer,
      data: newCustomer,
    });
  } catch (error) {
    console.error('❌ Error creating customer:', error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// ==========================================
// 4. UPDATE CUSTOMER
// PUT /api/customers/:id
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    const Customer = getTenantCustomerModel(req.tenantDb);

    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      customer: updated,
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// ==========================================
// 5. DELETE CUSTOMER
// DELETE /api/customers/:id
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const Customer = getTenantCustomerModel(req.tenantDb);
    const deleted = await Customer.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
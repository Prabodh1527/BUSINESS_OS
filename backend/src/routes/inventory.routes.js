import express from 'express';
import mongoose from 'mongoose';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Define schema directly
const inventorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    sku: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, default: 'General' },
    unitPrice: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 },
    stockQuantity: { type: Number, default: 0 },
    minStockThreshold: { type: Number, default: 5 },
  },
  { timestamps: true }
);

// Helper to get or create Model on the dynamic tenant database connection
const getTenantInventoryModel = (tenantDb) => {
  if (!tenantDb) {
    throw new Error('Tenant database connection missing from request context.');
  }
  return tenantDb.models.Inventory || tenantDb.model('Inventory', inventorySchema);
};

// Apply auth middleware to protect all routes and populate req.tenantDb
router.use(protect);

// GET /api/inventory - Fetch all items from the isolated tenant database
router.get('/', async (req, res) => {
  try {
    const Inventory = getTenantInventoryModel(req.tenantDb);

    // Query exclusively within the tenant's isolated database
    const items = await Inventory.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      inventory: items,
      data: items,
    });
  } catch (error) {
    console.error('❌ Error fetching inventory:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve inventory items.',
    });
  }
});

// POST /api/inventory - Save new item in the isolated tenant database
router.post('/', async (req, res) => {
  try {
    const Inventory = getTenantInventoryModel(req.tenantDb);

    const {
      sku,
      skuCode,
      name,
      productName,
      category,
      unitPrice,
      price,
      taxRate,
      stockQuantity,
      stock,
      quantity,
      minStockThreshold,
      lowStockLimit,
    } = req.body;

    const newItem = new Inventory({
      userId: req.user?._id || req.user?.id || null,
      sku: sku || skuCode || `SKU-${Date.now()}`,
      name: name || productName || 'New Product',
      category: category || 'General',
      unitPrice: Number(unitPrice ?? price ?? 0),
      taxRate: Number(taxRate ?? 18),
      stockQuantity: Number(stockQuantity ?? stock ?? quantity ?? 0),
      minStockThreshold: Number(minStockThreshold ?? lowStockLimit ?? 5),
    });

    const savedItem = await newItem.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      inventory: savedItem,
      data: savedItem,
    });
  } catch (error) {
    console.error('❌ Error saving inventory:', error);
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to save product.',
    });
  }
});

// PUT /api/inventory/:id - Update item in the isolated tenant database
router.put('/:id', async (req, res) => {
  try {
    const Inventory = getTenantInventoryModel(req.tenantDb);
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Item not found in workspace' });
    }

    return res.status(200).json({
      success: true,
      inventory: updated,
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/inventory/:id - Delete item from the isolated tenant database
router.delete('/:id', async (req, res) => {
  try {
    const Inventory = getTenantInventoryModel(req.tenantDb);
    const deleted = await Inventory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found in workspace' });
    }

    return res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
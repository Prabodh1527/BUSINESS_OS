
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define schema directly or import your existing model
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

const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);

// Optional auth extraction middleware
const extractUser = (req, res, next) => {
  // If your app attaches user to req.user via JWT middleware, keep it available
  next();
};

// GET /api/inventory - Fetch all items
router.get('/', extractUser, async (req, res) => {
  try {
    const filter = {};
    
    // If your model filters by owner/userId, apply it conditionally
    if (req.user && req.user._id) {
      filter.userId = req.user._id;
    }

    let items = await Inventory.find(filter).sort({ createdAt: -1 });

    // Fallback: If user-filtered query returns empty, fetch all items to prevent blank screens
    if (items.length === 0 && req.user) {
      items = await Inventory.find({}).sort({ createdAt: -1 });
    }

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

// POST /api/inventory - Save new item
router.post('/', extractUser, async (req, res) => {
  try {
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

// PUT /api/inventory/:id - Update item
router.put('/:id', extractUser, async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({
      success: true,
      inventory: updated,
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/inventory/:id - Delete item
router.delete('/:id', extractUser, async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;



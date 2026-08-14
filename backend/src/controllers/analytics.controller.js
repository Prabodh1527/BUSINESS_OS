import Invoice from '../models/invoice.model.js';
import Customer from '../models/customer.model.js';
import Inventory from '../models/inventory.model.js';

export const getDashboardAnalytics = async (req, res) => {
  try {
    const tenantId = req.tenantId;

    // Revenue and Pending Invoices
    const invoiceStats = await Invoice.aggregate([
      { $match: { tenantId } },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$status', 'Paid'] }, '$totalAmount', 0] },
          },
          pendingAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, '$totalAmount', 0] },
          },
          pendingCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] },
          },
          totalInvoices: { $sum: 1 },
        },
      },
    ]);

    const invoiceData = invoiceStats[0] || {
      totalRevenue: 0,
      pendingAmount: 0,
      pendingCount: 0,
      totalInvoices: 0,
    };

    // Total Customers
    const totalCustomers = await Customer.countDocuments({ tenantId });

    // Low Stock Items (quantity <= 10)
    const LOW_STOCK_THRESHOLD = 10;
    const lowStockCount = await Inventory.countDocuments({
      tenantId,
      $or: [
        { quantity: { $lte: LOW_STOCK_THRESHOLD } },
        { stockQuantity: { $lte: LOW_STOCK_THRESHOLD } },
      ],
    });

    const lowStockItems = await Inventory.find({
      tenantId,
      $or: [
        { quantity: { $lte: LOW_STOCK_THRESHOLD } },
        { stockQuantity: { $lte: LOW_STOCK_THRESHOLD } },
      ],
    })
      .limit(5)
      .sort({ quantity: 1 });

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalRevenue: invoiceData.totalRevenue,
          pendingInvoicesAmount: invoiceData.pendingAmount,
          pendingInvoicesCount: invoiceData.pendingCount,
          totalCustomers,
          lowStockCount,
        },
        lowStockItems,
      },
    });
  } catch (error) {
    console.error('❌ Analytics Fetch Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to calculate dashboard analytics.',
    });
  }
};
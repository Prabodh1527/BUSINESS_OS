import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  itemType: {
    type: String,
    enum: ['PRODUCT', 'SERVICE', 'SUBSCRIPTION'],
    default: 'PRODUCT',
  },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true, default: 0 },
  taxRate: { type: Number, default: 0 },
  total: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      email: String,
      phone: String,
      taxId: String,
    },
    businessType: {
      type: String,
      enum: ['RETAIL', 'SERVICE', 'B2B', 'SUBSCRIPTION'],
      default: 'SERVICE',
    },
    items: [invoiceItemSchema],
    subtotal: { type: Number, required: true },
    taxTotal: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },

    amountPaid: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 },

    currency: { type: String, default: 'INR' },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'CARD', 'CASH', 'BANK_TRANSFER', 'NET_BANKING', 'PENDING'],
      default: 'PENDING',
    },
    upiId: { type: String, default: 'merchant@upi' },

    status: {
      type: String,
      enum: ['PAID', 'PARTIAL', 'PENDING', 'OVERDUE', 'CANCELLED', 'REFUNDED'],
      default: 'PENDING',
    },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    notes: String,
  },
  { timestamps: true }
);

invoiceSchema.pre('validate', function (next) {
  this.balanceDue = Math.max(0, this.grandTotal - (this.amountPaid || 0));

  if (this.status !== 'CANCELLED' && this.status !== 'REFUNDED') {
    if (this.balanceDue === 0) {
      this.status = 'PAID';
    } else if (this.amountPaid > 0 && this.balanceDue > 0) {
      this.status = 'PARTIAL';
    } else if (this.dueDate && new Date() > this.dueDate) {
      this.status = 'OVERDUE';
    }
  }

  next();
});

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

export default Invoice;
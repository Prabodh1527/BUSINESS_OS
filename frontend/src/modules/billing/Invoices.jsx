import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalRevenue: 0,
    paidCount: 0,
    pendingCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Partial payment modal state
  const [paymentModal, setPaymentModal] = useState({
    open: false,
    invoice: null,
    amount: '',
  });

  // Dynamic Multi-Item Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    businessType: 'SERVICE',
    paymentMethod: 'UPI',
    upiId: 'merchant@upi',
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    items: [{ description: '', quantity: 1, unitPrice: 0, taxRate: 0 }],
  });

  const API_URL = 'http://localhost:5000/api/invoices';

  // Fetch all invoices and summary stats
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setInvoices(data.invoices || []);
        setStats(
          data.stats || {
            totalInvoices: 0,
            totalRevenue: 0,
            paidCount: 0,
            pendingCount: 0,
          }
        );
      }
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // -------------------------------------------------------------
  // LINE ITEMS & REAL-TIME CALCULATION HANDLERS
  // -------------------------------------------------------------
  
  // Update line item state when user edits description, quantity, price, or tax
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = field === 'description' ? value : Number(value);
    setFormData({ ...formData, items: updatedItems });
  };

  // Add a new blank row to line items
  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0, taxRate: 0 }],
    });
  };

  // Remove a row from line items
  const removeItemRow = (index) => {
    if (formData.items.length === 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  // Real-Time Total Calculation Engine
  const calculateTotals = () => {
    let subtotal = 0;
    let taxTotal = 0;
    formData.items.forEach((item) => {
      const itemSub = (item.quantity || 0) * (item.unitPrice || 0);
      const itemTax = (itemSub * (item.taxRate || 0)) / 100;
      subtotal += itemSub;
      taxTotal += itemTax;
    });
    return { 
      subtotal, 
      taxTotal, 
      grandTotal: subtotal + taxTotal 
    };
  };

  // -------------------------------------------------------------
  // INVOICE CREATION & PAYMENT HANDLERS
  // -------------------------------------------------------------
  
  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    try {
      const { subtotal, taxTotal, grandTotal } = calculateTotals();
      const payload = {
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
        },
        businessType: formData.businessType,
        paymentMethod: formData.paymentMethod,
        upiId: formData.upiId,
        dueDate: formData.dueDate,
        items: formData.items.map((item) => ({
          ...item,
          total: (item.quantity * item.unitPrice) + ((item.quantity * item.unitPrice * item.taxRate) / 100),
        })),
        subtotal,
        taxTotal,
        grandTotal,
        amountPaid: 0,
        balanceDue: grandTotal,
        status: 'PENDING',
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({
          customerName: '',
          customerEmail: '',
          businessType: 'SERVICE',
          paymentMethod: 'UPI',
          upiId: 'merchant@upi',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          items: [{ description: '', quantity: 1, unitPrice: 0, taxRate: 0 }],
        });
        fetchInvoices();
      } else {
        alert(data.message || 'Failed to create invoice');
      }
    } catch (err) {
      console.error('Error creating invoice:', err);
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();

    if (!paymentModal.invoice) {
      alert('No invoice selected.');
      return;
    }

    const invoice = paymentModal.invoice;
    const paymentNum = Number(paymentModal.amount);
    const targetId = invoice._id || invoice.id;
    const currentBalance = invoice.balanceDue !== undefined ? invoice.balanceDue : invoice.grandTotal;

    if (isNaN(paymentNum) || paymentNum <= 0) {
      alert('Please enter a valid payment amount greater than 0.');
      return;
    }

    if (paymentNum > currentBalance) {
      alert(`Payment cannot exceed the outstanding balance (₹${currentBalance}).`);
      return;
    }

    try {
      // Dynamic URL target with fallback body parameter to guarantee backend endpoint match
      const endpoint = targetId 
        ? `${API_URL}/${targetId}/payment`
        : `${API_URL}/payment`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: targetId || invoice.invoiceNumber,
          amount: paymentNum,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPaymentModal({ open: false, invoice: null, amount: '' });
        fetchInvoices();
      } else {
        alert(data.message || 'Failed to update payment on backend.');
      }
    } catch (err) {
      console.error('Error logging payment:', err);
      alert('Server connection error. Make sure your backend server is running and the payment endpoint exists.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchInvoices();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getComputedStatus = (inv) => {
    if (inv.status === 'PAID' || inv.status === 'CANCELLED') {
      return inv.status;
    }
    const today = new Date().toISOString().slice(0, 10);
    if (inv.dueDate && inv.dueDate.slice(0, 10) < today && (inv.balanceDue > 0 || inv.balanceDue === undefined)) {
      return 'OVERDUE';
    }
    return inv.status || 'PENDING';
  };

  // Export to CSV
  const exportToExcel = () => {
    if (invoices.length === 0) return alert('No invoices available to export.');

    const headers = ['Invoice Number', 'Customer Name', 'Date', 'Due Date', 'Grand Total', 'Amount Paid', 'Balance Due', 'Status'];
    const rows = invoices.map((inv) => [
      inv.invoiceNumber,
      `"${inv.customer?.name || ''}"`,
      `="${inv.createdAt ? inv.createdAt.slice(0, 10) : ''}"`,
      `="${inv.dueDate ? inv.dueDate.slice(0, 10) : ''}"`,
      inv.grandTotal,
      inv.amountPaid || 0,
      inv.balanceDue !== undefined ? inv.balanceDue : inv.grandTotal,
      getComputedStatus(inv),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Invoices_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Download PDF
  const downloadPDF = () => {
    const element = document.getElementById('printable-invoice');
    if (!element) return;

    const generate = () => {
      const opt = {
        margin: 0.4,
        filename: `${selectedInvoice.invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      window.html2pdf().set(opt).from(element).save();
    };

    if (window.html2pdf) {
      generate();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = generate;
      document.body.appendChild(script);
    }
  };

  const filteredInvoices = invoices.filter((inv) =>
    inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
    inv.customer?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-slate-100 bg-[#0B0F19] min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Invoices</h1>
          <p className="text-slate-400 text-sm mt-1">
            Enterprise billing, partial tracking, and dynamic UPI generation.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="bg-[#1A2234] border border-slate-700 hover:bg-slate-800 text-slate-200 px-4 py-2.5 rounded-lg font-medium text-sm transition cursor-pointer"
          >
            Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg leading-none">+</span> New Invoice
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-slate-400 text-xs font-medium">Total Invoices</p>
          <h2 className="text-2xl font-bold text-white mt-1">{stats.totalInvoices}</h2>
        </div>
        <div className="bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-slate-400 text-xs font-medium">Total Revenue</p>
          <h2 className="text-2xl font-bold text-emerald-400 mt-1">
            ₹{stats.totalRevenue?.toLocaleString('en-IN')}
          </h2>
        </div>
        <div className="bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-slate-400 text-xs font-medium">Paid Invoices</p>
          <h2 className="text-2xl font-bold text-blue-400 mt-1">{stats.paidCount}</h2>
        </div>
        <div className="bg-[#111827] p-5 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-slate-400 text-xs font-medium">Pending / Overdue</p>
          <h2 className="text-2xl font-bold text-amber-400 mt-1">{stats.pendingCount}</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111827] p-4 rounded-xl border border-slate-800 mb-6">
        <input
          type="text"
          placeholder="Search invoices by ID or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-[#1A2234] border border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading invoices...</div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">No invoices found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-[#161F32]">
                  <th className="py-3.5 px-5 font-semibold">Invoice</th>
                  <th className="py-3.5 px-5 font-semibold">Customer</th>
                  <th className="py-3.5 px-5 font-semibold">Due Date</th>
                  <th className="py-3.5 px-5 font-semibold">Grand Total</th>
                  <th className="py-3.5 px-5 font-semibold">Balance Due</th>
                  <th className="py-3.5 px-5 font-semibold">Status</th>
                  <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredInvoices.map((inv) => {
                  const status = getComputedStatus(inv);
                  const balanceDue = inv.balanceDue !== undefined ? inv.balanceDue : inv.grandTotal;

                  return (
                    <tr key={inv._id || inv.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-4 px-5 font-medium text-indigo-400">{inv.invoiceNumber}</td>
                      <td className="py-4 px-5 text-slate-200 font-medium">{inv.customer?.name || 'N/A'}</td>
                      <td className="py-4 px-5 text-slate-400">
                        {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-GB') : 'N/A'}
                      </td>
                      <td className="py-4 px-5 font-semibold text-slate-100">
                        ₹{inv.grandTotal?.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-5 font-semibold text-amber-400">
                        ₹{balanceDue?.toLocaleString('en-IN')}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-5">
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(inv._id || inv.id, e.target.value)}
                          className={`px-2.5 py-1 rounded text-xs font-bold border focus:outline-none cursor-pointer transition ${
                            status === 'PAID'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : status === 'OVERDUE'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'
                              : status === 'PARTIAL'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          <option value="PENDING" className="bg-[#111827] text-amber-400">PENDING</option>
                          <option value="PARTIAL" className="bg-[#111827] text-blue-400">PARTIAL</option>
                          <option value="PAID" className="bg-[#111827] text-emerald-400">PAID</option>
                          <option value="OVERDUE" className="bg-[#111827] text-rose-400">OVERDUE</option>
                          <option value="CANCELLED" className="bg-[#111827] text-slate-400">CANCELLED</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-5 text-right flex justify-end gap-2">
                        {balanceDue > 0 && status !== 'CANCELLED' && (
                          <button
                            onClick={() => setPaymentModal({ open: true, invoice: inv, amount: balanceDue })}
                            className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 px-2.5 py-1 rounded text-xs border border-emerald-500/30 transition cursor-pointer"
                          >
                            Log Payment
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 px-3 py-1 rounded text-xs border border-indigo-500/30 transition cursor-pointer"
                        >
                          PDF Preview
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dynamic Multi-Item Invoice Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-[#111827] border border-slate-700 rounded-xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">Create Invoice</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs md:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIPTI"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-[#1A2234] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Customer Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full bg-[#1A2234] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full bg-[#1A2234] border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="UPI">UPI Quick Pay</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="CASH">Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Merchant UPI ID</label>
                  <input
                    type="text"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="w-full bg-[#1A2234] border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full bg-[#1A2234] border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              {/* DYNAMIC LINE ITEMS SECTION */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-300 font-bold">Line Items</label>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    + Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center bg-[#1A2234] p-2.5 rounded-lg border border-slate-700/50">
                      <input
                        type="text"
                        required
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="flex-1 bg-transparent text-white focus:outline-none"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-16 bg-[#111827] border border-slate-700 rounded px-2 py-1 text-white text-center"
                      />
                      <input
                        type="number"
                        placeholder="Price (₹)"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        className="w-24 bg-[#111827] border border-slate-700 rounded px-2 py-1 text-white text-center"
                      />
                      <input
                        type="number"
                        placeholder="Tax (%)"
                        value={item.taxRate}
                        onChange={(e) => handleItemChange(index, 'taxRate', e.target.value)}
                        className="w-16 bg-[#111827] border border-slate-700 rounded px-2 py-1 text-white text-center"
                      />
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItemRow(index)}
                          className="text-rose-400 hover:text-rose-300 px-1 font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* REAL-TIME CALCULATED TOTALS */}
              <div className="bg-[#161F32] p-3 rounded-lg text-right space-y-1 text-xs">
                <p className="text-slate-400">Subtotal: ₹{calculateTotals().subtotal.toLocaleString('en-IN')}</p>
                <p className="text-slate-400">Tax Total: ₹{calculateTotals().taxTotal.toLocaleString('en-IN')}</p>
                <p className="text-base font-bold text-emerald-400">
                  Grand Total: ₹{calculateTotals().grandTotal.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition cursor-pointer">
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Partial Payment Modal */}
      {paymentModal.open && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-[#111827] border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Record Payment</h3>
            <p className="text-xs text-slate-400 mb-4">
              Invoice #{paymentModal.invoice?.invoiceNumber} — Outstanding Balance: ₹
              {(paymentModal.invoice?.balanceDue ?? paymentModal.invoice?.grandTotal)?.toLocaleString('en-IN')}
            </p>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={paymentModal.amount}
                  onChange={(e) => setPaymentModal({ ...paymentModal, amount: e.target.value })}
                  className="w-full bg-[#1A2234] border border-slate-700 rounded-lg p-2.5 text-white font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModal({ open: false, invoice: null, amount: '' })}
                  className="px-4 py-2 bg-slate-800 rounded-lg text-xs text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs text-white font-bold transition cursor-pointer"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF View Modal with Dynamic UPI QR Code */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 text-slate-800 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Invoice Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={downloadPDF}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded text-sm font-medium transition cursor-pointer"
                >
                  Download PDF
                </button>
                <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-white px-3 py-1 cursor-pointer">
                  ✕
                </button>
              </div>
            </div>

            <div id="printable-invoice" className="bg-white p-8 rounded-lg text-slate-800 shadow-md border border-slate-200">
              <div className="flex justify-between items-start mb-8 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-indigo-600">BUSINESS OS</h2>
                  <p className="text-xs text-slate-500">Official Invoice Document</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold text-slate-800">{selectedInvoice.invoiceNumber}</h3>
                  <p className="text-xs text-slate-500">
                    Date: {selectedInvoice.createdAt ? selectedInvoice.createdAt.slice(0, 10) : 'N/A'}
                  </p>
                  <p className="text-xs font-semibold text-rose-600">
                    Due Date: {selectedInvoice.dueDate ? selectedInvoice.dueDate.slice(0, 10) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Billed To</p>
                <p className="text-base font-bold text-slate-800">{selectedInvoice.customer?.name || 'Customer'}</p>
                {selectedInvoice.customer?.email && <p className="text-sm text-slate-600">{selectedInvoice.customer.email}</p>}
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-sm mb-6 border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-600">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items?.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-100">
                      <td className="py-3 font-medium text-slate-800">{item.description}</td>
                      <td className="py-3 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-3 text-right text-slate-600">₹{item.unitPrice?.toLocaleString('en-IN')}</td>
                      <td className="py-3 text-right font-semibold text-slate-800">
                        ₹{(item.total || item.quantity * item.unitPrice)?.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Bottom Section: QR Code Payment & Balance Due Summary */}
              <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                {/* Dynamic UPI Payment QR Code */}
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <QRCodeSVG
                    value={`upi://pay?pa=${selectedInvoice.upiId || 'merchant@upi'}&pn=${encodeURIComponent(
                      selectedInvoice.customer?.name || 'Business'
                    )}&am=${selectedInvoice.balanceDue !== undefined ? selectedInvoice.balanceDue : selectedInvoice.grandTotal}&cu=INR`}
                    size={80}
                  />
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">Scan & Pay via UPI</p>
                    <p className="text-slate-500">UPI ID: {selectedInvoice.upiId || 'merchant@upi'}</p>
                    <p className="text-emerald-600 font-semibold mt-1">Instant Payment</p>
                  </div>
                </div>

                <div className="w-56 text-right space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoice.subtotal?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Tax Total:</span>
                    <span>₹{selectedInvoice.taxTotal?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-800 pt-1 border-t">
                    <span>Grand Total:</span>
                    <span>₹{selectedInvoice.grandTotal?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600 font-medium">
                    <span>Amount Paid:</span>
                    <span>₹{(selectedInvoice.amountPaid || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-amber-600 pt-1 border-t">
                    <span>Balance Due:</span>
                    <span>
                      ₹
                      {(selectedInvoice.balanceDue !== undefined
                        ? selectedInvoice.balanceDue
                        : selectedInvoice.grandTotal
                      )?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
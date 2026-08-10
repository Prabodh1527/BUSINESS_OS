import React, { useState, useEffect } from "react";

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      email: "",
      phone: "",
    },
    businessType: "SERVICE",
    items: [
      { description: "", quantity: 1, unitPrice: 0, taxRate: 0 }
    ],
    dueDate: "",
    notes: "",
  });

  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  // Read stored notification on component mount (persists across redirects/remounts)
  useEffect(() => {
    const storedNotification = sessionStorage.getItem("invoice_notification");
    if (storedNotification) {
      const parsed = JSON.parse(storedNotification);
      showNotification(parsed.message, parsed.type);
      sessionStorage.removeItem("invoice_notification");
    }
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 5000);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [name]: value,
      },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { description: "", quantity: 1, unitPrice: 0, taxRate: 0 },
      ],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        const msg = data.message || `Invoice generated successfully for ${formData.customer.name}!`;
        
        // Save to session storage so notification shows even if component re-renders
        sessionStorage.setItem(
          "invoice_notification",
          JSON.stringify({ message: msg, type: "success" })
        );

        showNotification(msg, "success");

        // Reset Form
        setFormData({
          customer: { name: "", email: "", phone: "" },
          businessType: "SERVICE",
          items: [{ description: "", quantity: 1, unitPrice: 0, taxRate: 0 }],
          dueDate: "",
          notes: "",
        });
      } else {
        showNotification(`Error: ${data.message}`, "error");
      }
    } catch (error) {
      showNotification(`Failed to create invoice: ${error.message}`, "error");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Top Floating Notification Banner */}
      {notification.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 99999,
            padding: "14px 24px",
            borderRadius: "6px",
            color: "#ffffff",
            backgroundColor: notification.type === "success" ? "#10b981" : "#ef4444",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
            fontWeight: "bold",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span>{notification.message}</span>
          <button
            type="button"
            onClick={() => setNotification({ ...notification, show: false })}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ padding: "20px", background: "#0f172a", color: "#fff", borderRadius: "8px" }}>
        <h2>Create New Invoice</h2>

        {/* Customer Information */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            name="name"
            placeholder="Customer Name *"
            value={formData.customer.name}
            onChange={handleCustomerChange}
            required
            style={{ padding: "8px", flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Customer Email *"
            value={formData.customer.email}
            onChange={handleCustomerChange}
            required
            style={{ padding: "8px", flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Customer Phone"
            value={formData.customer.phone}
            onChange={handleCustomerChange}
            style={{ padding: "8px", flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
          />
        </div>

        {/* Invoice Details */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            style={{ padding: "8px", flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
          />
        </div>

        {/* Items Section */}
        <h3>Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Item Description"
              value={item.description}
              onChange={(e) => handleItemChange(index, "description", e.target.value)}
              required
              style={{ padding: "8px", flex: 2, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value) || 0)}
              required
              style={{ padding: "8px", flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
              required
              style={{ padding: "8px", flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
            />
            <input
              type="number"
              placeholder="Tax Rate (%)"
              value={item.taxRate}
              onChange={(e) => handleItemChange(index, "taxRate", parseFloat(e.target.value) || 0)}
              style={{ padding: "8px", flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
            />
            {formData.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                style={{ background: "#dc2626", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", marginBottom: "15px" }}
        >
          + Add Item
        </button>

        {/* Notes */}
        <div style={{ marginBottom: "15px" }}>
          <textarea
            placeholder="Notes / Payment terms..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            style={{ width: "100%", padding: "8px", background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}
          />
        </div>

        <button
          type="submit"
          style={{ background: "#10b981", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
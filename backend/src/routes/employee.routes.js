import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { protect } from "../middleware/auth.middleware.js";
import { attachTenantDB } from "../middleware/tenant.middleware.js";
import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";

const router = express.Router();

// Guard all routes
router.use(protect, attachTenantDB);

// ==========================================
// 1. GET ALL EMPLOYEES & STATS
// GET /api/employees
// ==========================================
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({ tenantId: req.tenantId }).sort({
      createdAt: -1,
    });

    let activeCount = 0;
    let onLeaveCount = 0;
    let totalPayroll = 0;

    employees.forEach((emp) => {
      const status = (emp.status || "").toUpperCase();
      if (status === "ACTIVE") activeCount++;
      if (status === "ON_LEAVE" || status === "ON LEAVE") onLeaveCount++;
      totalPayroll += Number(emp.salary || 0);
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalEmployees: employees.length,
        activeCount,
        onLeaveCount,
        totalPayroll,
      },
      employees,
      data: employees,
    });
  } catch (error) {
    console.error("❌ Fetch Employees Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. GET SINGLE EMPLOYEE
// GET /api/employees/:id
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      tenantId: req.tenantId,
    });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found." });
    }

    return res.status(200).json({
      success: true,
      employee,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 3. CREATE EMPLOYEE & PORTAL ACCOUNT
// POST /api/employees
// ==========================================
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role = "Staff",
      department = "Operations",
      salary = 0,
      status = "ACTIVE",
    } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Employee name and email are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate employee for this tenant
    const existingEmployee = await Employee.findOne({
      tenantId: req.tenantId,
      email: normalizedEmail,
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "An employee with this email is already registered.",
      });
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const employeeId = `EMP-${randomSuffix}`;

    // 1. Create Employee Record
    const newEmployee = await Employee.create({
      tenantId: req.tenantId,
      employeeId,
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || "",
      role: role.trim() || "Staff",
      department: department.trim() || "Operations",
      salary: Number(salary) || 0,
      joinDate: new Date().toISOString().slice(0, 10),
      status: status.toUpperCase(),
    });

    // 2. Safely create portal login user
    const tempPassword = `Pass@${crypto.randomBytes(3).toString("hex")}`;
    try {
      if (User && typeof User.findOne === "function") {
        let user = await User.findOne({ email: normalizedEmail });
        if (!user) {
          await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: tempPassword,
            role: "EMPLOYEE",
            tenantId: req.tenantId,
            isActive: true,
          });
        }
      }
    } catch (userErr) {
      console.warn("⚠️ Portal user creation skipped:", userErr.message);
    }

    // 3. Safely attempt email dispatch
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const portalUrl = process.env.CLIENT_URL || "http://localhost:5173";

        await transporter.sendMail({
          from: `"Business OS" <${process.env.SMTP_USER}>`,
          to: normalizedEmail,
          subject: "Your Employee Portal Login Credentials",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
              <h2 style="color: #4f46e5;">Welcome to Business OS, ${name}!</h2>
              <p>Your employee profile has been created.</p>
              <p><strong>Portal URL:</strong> <a href="${portalUrl}/login">${portalUrl}/login</a></p>
              <p><strong>Email:</strong> ${normalizedEmail}</p>
              <p><strong>Temporary Password:</strong> ${tempPassword}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("⚠️ SMTP credentials invalid — skipping email dispatch.");
      }
    }

    return res.status(201).json({
      success: true,
      message: "Employee registered successfully!",
      employee: newEmployee,
      data: newEmployee,
    });
  } catch (error) {
    console.error("❌ Add Employee Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 4. DELETE EMPLOYEE
// DELETE /api/employees/:id
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenantId,
    });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    // Deactivate user login account if present
    if (employee.email && User && typeof User.findOneAndUpdate === "function") {
      await User.findOneAndUpdate(
        { email: employee.email, tenantId: req.tenantId },
        { $set: { isActive: false } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Employee removed successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 5. UPDATE EMPLOYEE
// PATCH /api/employees/:id
// ==========================================
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      employee: updated,
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
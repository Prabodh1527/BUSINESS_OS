import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'business_os_super_secret_key_2026';

// Middleware to authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// Helper: Helper function to generate clean tenant database names
const generateTenantDbName = (identifier) => {
  const sanitized = identifier.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `tenant_${sanitized}_${Date.now()}`;
};

// ==========================================
// 1. REGISTER OWNER / WORKSPACE ROUTE
// POST http://localhost:5000/api/auth/register
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate isolated database identifier
    const tenantDbName = generateTenantDbName(companyName || name);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role ? role.toUpperCase() : 'OWNER',
      tenantDbName,
      companyName: companyName || `${name}'s Workspace`,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
        id: newUser._id,
        role: newUser.role,
        tenantDbName: newUser.tenantDbName,
        companyId: newUser._id,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Workspace created successfully!',
      token,
      tenantDbName: newUser.tenantDbName,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        tenantDbName: newUser.tenantDbName,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.',
    });
  }
});

// ==========================================
// 2. LOGIN ROUTE (Owner & Employee)
// POST http://localhost:5000/api/auth/login
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: 'Password record missing for this account. Please re-register.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Ensure user has an assigned tenantDbName or fallback based on company context
    const tenantDbName =
      user.tenantDbName ||
      `tenant_${(user.companyId || user._id).toString().toLowerCase()}`;

    const token = jwt.sign(
      {
        userId: user._id,
        id: user._id,
        role: user.role,
        tenantDbName,
        companyId: user.companyId || user._id,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      tenantDbName,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantDbName,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.',
    });
  }
});

// ==========================================
// 3. FORGOT PASSWORD (SEND OTP EMAIL)
// POST http://localhost:5000/api/auth/forgot-password
// ==========================================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account registered with this email address.' });
    }

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP & set expiration time (10 minutes)
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send OTP via Nodemailer
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `Business OS <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Password Reset OTP - Business OS',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #4f46e5; margin-top: 0;">Password Reset Request</h2>
            <p style="color: #334155;">Use the following OTP code to reset your password. This code will expire in 10 minutes.</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: center;">
              <span style="font-family: monospace; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #1e293b;">${otp}</span>
            </div>

            <p style="color: #64748b; font-size: 13px;">If you didn't request this password reset, please ignore this email.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Password reset OTP sent to ${email}`);
    } else {
      console.warn(`⚠️ SMTP not configured. OTP generated for ${email}: ${otp}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Password reset OTP has been sent to your email address.',
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while sending OTP.',
    });
  }
});

// ==========================================
// 4. VERIFY OTP & RESET PASSWORD
// POST http://localhost:5000/api/auth/reset-password
// ==========================================
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required.',
      });
    }

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP code.',
      });
    }

    // Hash new password and clear OTP fields
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while resetting password.',
    });
  }
});

// ==========================================
// 5. UPDATE PASSWORD (SETTINGS / LOGGED IN)
// PUT http://localhost:5000/api/auth/update-password
// ==========================================
router.put('/update-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId || req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.',
      });
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully!',
    });
  } catch (error) {
    console.error('Update Password Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating password.',
    });
  }
});

// ==========================================
// 6. CREATE EMPLOYEE & SEND EMAIL CREDENTIALS
// POST http://localhost:5000/api/auth/create-employee
// ==========================================
router.post('/create-employee', authenticateToken, async (req, res) => {
  try {
    const { name, email, designation, phone, salary, status } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name and Email are required.',
      });
    }

    const generatedPassword = `Emp#${crypto.randomBytes(3).toString('hex')}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(generatedPassword, salt);

    // Fetch workspace context from creating user or token
    const creator = await User.findById(req.user.userId || req.user.id);
    const tenantDbName = creator?.tenantDbName || req.user.tenantDbName;
    const companyId = creator?.companyId || creator?._id || req.user.companyId;

    const newEmployee = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'EMPLOYEE',
      phone,
      salary,
      status: status || 'Active',
      tenantDbName,
      companyId,
    });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `Business OS <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Welcome to Business OS - Your Account Login Credentials',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #4f46e5; margin-top: 0;">Welcome aboard, ${name}!</h2>
            <p style="color: #334155;">Your employee profile has been created in Business OS.</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; color: #475569;"><strong>Login Portal:</strong> <a href="http://localhost:5173/login" style="color: #4f46e5;">Access Portal</a></p>
              <p style="margin: 0 0 8px 0; color: #475569;"><strong>Email / Username:</strong> ${email}</p>
              <p style="margin: 0; color: #475569;"><strong>Temporary Password:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #1e293b;">${generatedPassword}</span></p>
            </div>

            <p style="color: #64748b; font-size: 13px;">Please log in using these credentials.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email with credentials sent to ${email}`);
    }

    return res.status(201).json({
      success: true,
      message: 'Employee created and login credentials sent via email!',
      employee: {
        _id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        designation: designation || 'Employee',
        phone,
        salary,
        status: newEmployee.status,
        tenantDbName: newEmployee.tenantDbName,
      },
    });
  } catch (error) {
    console.error('Create Employee Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create employee.',
    });
  }
});

export default router;
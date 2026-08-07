import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// Helper function to hash OTP using SHA-256
const hashOtp = (otpString) => {
  return crypto.createHash('sha256').update(otpString).digest('hex');
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userExists = await User.findOne({ email: cleanEmail });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: cleanEmail,
      password,
      role: role ? role.toUpperCase() : 'OWNER',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = email ? email.trim().toLowerCase() : '';

    const user = await User.findOne({ email: cleanEmail });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send password reset OTP via email
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email.' });
    }

    // Generate 6-digit OTP string
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = hashOtp(rawOtp);
    const otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutes validity

    // Store hashed OTP directly in MongoDB
    await User.updateOne(
      { _id: user._id },
      { $set: { resetOtp: hashedOtp, resetOtpExpires: otpExpires } }
    );

    // Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Business OS" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: 'Password Reset OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 12px;">
          <h2 style="color: #818cf8;">Business OS</h2>
          <p>You requested a password reset. Use the OTP code below to proceed:</p>
          <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; display: inline-block; margin: 10px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #34d399;">${rawOtp}</span>
          </div>
          <p style="color: #94a3b8; font-size: 12px;">This code will expire in 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

   console.log(`✉️ OTP email sent to ${cleanEmail}`);
    return res.status(200).json({ success: true, message: 'OTP code sent to your Gmail address.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP email.' });
  }
};

// @desc    Verify OTP and reset password
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanInputOtp = String(otp).trim();
    const hashedInputOtp = hashOtp(cleanInputOtp);

    const user = await User.findOne({ email: cleanEmail });

    if (!user || !user.resetOtp) {
      console.log(`❌ Reset failed: No active OTP request found for ${cleanEmail}.`);
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code.' });
    }

    // 1. Check Expiry
    if (!user.resetOtpExpires || new Date(user.resetOtpExpires).getTime() < Date.now()) {
      console.log(`❌ Reset failed: OTP has expired for ${cleanEmail}.`);
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code.' });
    }

    // 2. Check Match
    if (user.resetOtp !== hashedInputOtp) {
      console.log(`❌ Reset failed: Input OTP (${cleanInputOtp}) does not match stored active OTP.`);
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP fields
    await User.updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetOtp: 1, resetOtpExpires: 1 },
      }
    );

    console.log(`✅ Password successfully reset for ${cleanEmail}`);
    return res.status(200).json({ success: true, message: 'Password successfully reset.' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to reset password.' });
  }
};
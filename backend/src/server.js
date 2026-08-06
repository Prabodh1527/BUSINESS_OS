import dotenv from 'dotenv';
// Initialize environment variables FIRST before any other imports
dotenv.config();

import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import nodemailer from 'nodemailer';

// Force Node.js to use Google & Cloudflare DNS for SRV lookup
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Import database connection AFTER setting up DNS and dotenv
import connectDB from './config/db.js';

// Import auth routes
import authRoutes from './routes/auth.routes.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Verify Nodemailer Email Transporter Connection on startup
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((error) => {
    if (error) {
      console.error('❌ Nodemailer Transporter Error:', error.message);
    } else {
      console.log('✅ SMTP Mailer is ready to send OTP emails');
    }
  });
} else {
  console.warn('⚠️ SMTP credentials missing in .env file');
}

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
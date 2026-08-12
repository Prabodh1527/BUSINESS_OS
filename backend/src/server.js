import 'dotenv/config'; // Loads process.env before any other imports execute

import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import nodemailer from 'nodemailer';

// Force Node.js to use Google & Cloudflare DNS for SRV lookup
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Import database connection AFTER setting up DNS and dotenv
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware Strategy
const corsOptions = {
  origin: '*', // Adjust to process.env.CLIENT_URL in production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight handling for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      console.log('✅ SMTP Mailer is ready to send emails');
    }
  });
} else {
  console.warn('⚠️ SMTP credentials missing in .env file');
}

// Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/inventory', inventoryRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend server is running!' });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Global Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
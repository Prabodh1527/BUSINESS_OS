import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    // Optional / soft default so password reset validation won't fail
    tenantDbName: {
      type: String,
      required: false,
      default: 'business_os',
    },
    role: {
      type: String,
      enum: ['ADMIN', 'OWNER', 'EMPLOYEE'],
      default: 'OWNER',
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
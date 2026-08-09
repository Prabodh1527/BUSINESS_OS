import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: function () {
        return this.email ? this.email.split("@")[0] : "User";
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Keeps password hidden unless explicitly asked for
    },
    role: {
      type: String,
      enum: ["OWNER", "MANAGER", "EMPLOYEE", "ADMIN", "USER"],
      default: "OWNER",
    },
    phone: String,
    salary: String,
    status: {
      type: String,
      default: "Active",
    },
    resetOtp: String,
    resetOtpExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Single secret reference to guarantee consistency across auth generation & middleware
const JWT_SECRET_KEY = process.env.JWT_SECRET || "business_os_super_secret_key_2026";

// Helper function to generate JWT token with multi-tenant payload support
const generateToken = (user) => {
  const userId = user._id || user.id;
  const companyId =
    user.companyId?.toString() ||
    user.company?.toString() ||
    userId.toString();

  return jwt.sign(
    {
      id: userId,
      _id: userId,
      email: user.email,
      role: user.role || "OWNER",
      companyId: companyId,
      tenantId: companyId,
      industry: user.industry || "General",
    },
    JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "OWNER",
      companyName: companyName || "",
    });

    const token = generateToken(user);
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: {
        ...userObj,
        token,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during registration.",
    });
  }
};
export const registerUser = register;

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      user: {
        ...userObj,
        token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error during login.",
    });
  }
};
export const loginUser = login;

// @desc    Forgot Password / Send OTP
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    if (!user.name) {
      user.name = user.email ? user.email.split("@")[0] : "User";
    }

    await user.save({ validateModifiedOnly: true });

    console.log(`[OTP] Password Reset Code for ${email}: ${otp}`);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP generated.",
      otp: process.env.NODE_ENV === "development" ? otp : undefined,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error processing forgot password request.",
    });
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and new password.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    if (otp && user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP code.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    if (!user.name) {
      user.name = user.email ? user.email.split("@")[0] : "User";
    }

    await user.save({ validateModifiedOnly: true });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error resetting password.",
    });
  }
};

// @desc    Update Password
// @route   PUT /api/auth/update-password
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const userId = req.user?._id || req.user?.id || req.user;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in request authorization.",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both current and new passwords.",
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password does not match.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    if (!user.name) {
      user.name = user.email ? user.email.split("@")[0] : "User";
    }

    await user.save({ validateModifiedOnly: true });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("Update Password Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while updating password.",
    });
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.user;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving profile.",
    });
  }
};
export const getUserProfile = getMe;
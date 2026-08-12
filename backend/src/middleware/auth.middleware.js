import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getTenantDatabase } from "../config/tenantManager.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Check if Authorization header exists and contains "Bearer"
    if (authHeader && authHeader.toLowerCase().startsWith("bearer")) {
      token = authHeader.replace(/^Bearer\s+/i, "").trim();
    }

    // 2. Reject missing or stringified null/undefined tokens
    if (!token || token === "null" || token === "undefined" || token === "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no valid token provided",
      });
    }

    // 3. Verify token signature using .env key with project fallback
    const secret = process.env.JWT_SECRET || "business_os_super_secret_key_2026";
    const decoded = jwt.verify(token, secret);

    // 4. Extract standard user identifier claims
    const userId = decoded.id || decoded._id || decoded.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token payload missing user identifier",
      });
    }

    // 5. Fetch user from MongoDB Master DB (or primary connection)
    let user = null;
    try {
      user = await User.findById(userId).select("-password").lean();
    } catch (dbErr) {
      console.error("User database query error in auth middleware:", dbErr.message);
    }

    // 6. Fallback if database query does not return a record
    if (!user) {
      if (decoded && (decoded.email || decoded.id || decoded._id)) {
        user = {
          _id: userId,
          id: userId,
          email: decoded.email || "",
          role: decoded.role || "OWNER",
          companyId: decoded.companyId || userId,
          tenantDbName: decoded.tenantDbName,
        };
      } else {
        return res.status(401).json({
          success: false,
          message: "Not authorized, user account not found",
        });
      }
    }

    // 7. Extract Tenant Database Identifier
    const tenantDbName =
      user.tenantDbName ||
      decoded.tenantDbName ||
      `tenant_${(user.companyId || userId).toString()}`;

    // 8. Attach dynamic tenant connection instance
    req.tenantDb = getTenantDatabase(tenantDbName);

    // 9. Multi-tenancy context attachment
    const userCompanyId =
      user.companyId?.toString() ||
      user.company?.toString() ||
      decoded.companyId ||
      decoded.tenantId ||
      userId.toString();

    user._id = user._id ? user._id.toString() : userId.toString();
    user.role = user.role || decoded.role || "OWNER";

    // Attach user information and multi-tenant keys to Request object
    req.user = user;
    req.companyId = userCompanyId;
    req.tenantId = userCompanyId;
    req.tenantDbName = tenantDbName;
    req.industry = user.industry || decoded.industry || "General";

    return next();
  } catch (error) {
    console.error("JWT Auth Middleware Error:", error.message);

    let message = "Not authorized, token failed";
    if (error.name === "TokenExpiredError") {
      message = "Token expired, please log in again";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token signature";
    }

    return res.status(401).json({
      success: false,
      message,
      error: error.message,
    });
  }
};
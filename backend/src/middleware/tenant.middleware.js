export const attachTenantDB = (req, res, next) => {
  try {
    // 1. Resolve tenant ID / business ID from JWT payload or headers
    const tenantId =
      req.user?.tenantId ||
      req.user?.businessId ||
      req.user?.organizationId ||
      req.headers["x-tenant-id"] ||
      req.user?._id; // Fallback to user ID if tenantId isn't explicitly set yet

    if (!tenantId) {
      return res.status(403).json({
        success: false,
        message: "Tenant identifier missing from request context.",
      });
    }

    // 2. Attach tenantId directly to the request object for Mongoose queries
    req.tenantId = tenantId.toString();

    next();
  } catch (error) {
    console.error("❌ attachTenantDB Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to attach tenant context.",
    });
  }
};
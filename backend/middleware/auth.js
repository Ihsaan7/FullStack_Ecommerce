import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    // Check for token in cookie first, then Authorization header
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers?.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // If no token found, continue without authentication
    if (!token) {
      console.log('🔐 No token found, continuing without auth');
      return next();
    }

    // Check if JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not configured');
      return next();
    }

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user object for downstream routes
    req.user = { 
      _id: payload.sub, 
      role: payload.role,
      email: payload.email 
    };
    
    console.log(`🔐 Auth successful for user: ${payload.email || payload.sub}`);
    return next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message || err);
    
    // Clear invalid cookie
    if (res.clearCookie) {
      res.clearCookie("token");
    }
    
    // Continue without authentication for invalid tokens
    return next();
  }
}

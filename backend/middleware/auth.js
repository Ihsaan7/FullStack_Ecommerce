import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach a minimal user object for downstream routes
    req.user = { _id: payload.sub, role: payload.role };
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message || err);
    // If token is invalid, respond 401. If you prefer silent failure, call next().
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

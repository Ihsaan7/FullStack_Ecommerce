export default function requireAuth(req, res, next) {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }
  return next();
}

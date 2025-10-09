import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import userModel from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

function signToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRY,
  });
}

router.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email address"),

    body("fullName").notEmpty().withMessage("Name is required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],

  async (req, res) => {
    const { fullName, email, password } = req.body;

    const existing = await userModel.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Username already in use!" });

    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashPass,
    });
    const token = signToken(user);

    // Set HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid Credentials!" });

  const token = signToken(user);

  // Set HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

// Get current user info
router.get("/me", auth, (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }
  res.json({ success: true, user: req.user });
});

// Logout route
router.post("/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;

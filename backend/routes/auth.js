import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import userModel from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

function signToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  return jwt.sign(
    { 
      sub: user._id, 
      role: user.role,
      email: user.email 
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: process.env.JWT_SECRET_EXPIRY || '7d',
    }
  );
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
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          message: "Validation failed", 
          errors: errors.array() 
        });
      }

      const { fullName, email, password } = req.body;

      // Check if user already exists
      const existing = await userModel.findOne({ email });
      if (existing) {
        return res.status(409).json({ 
          success: false,
          message: "Username already in use!" 
        });
      }

      // Hash password
      const hashPass = await bcrypt.hash(password, 10);

      // Create user
      const user = await userModel.create({
        fullName,
        email,
        password: hashPass,
      });

      // Generate token
      const token = signToken(user);

      // Set HttpOnly cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      console.log(`✅ New user created: ${email}`);

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
    } catch (error) {
      console.error('❌ Signup error:', error);
      res.status(500).json({ 
        success: false,
        message: "Server error during signup", 
        error: error.message 
      });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    console.log(`🔐 Login attempt for: ${email}`);

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log(`❌ Login failed: User '${email}' not found`);
      return res.status(401).json({ 
        success: false,
        message: "Invalid Credentials!" 
      });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log(`❌ Login failed: Wrong password for user '${email}'`);
      return res.status(401).json({ 
        success: false,
        message: "Invalid Credentials!" 
      });
    }

    // Generate token
    const token = signToken(user);

    // Set HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log(`✅ User logged in successfully: ${email}`);

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
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false,
      message: "Server error during login", 
      error: error.message 
    });
  }
});

// Get current user info
router.get("/me", auth, async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    // Fetch full user data from database
    const user = await userModel.findById(req.user._id).select('-password');
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    res.json({ 
      success: true, 
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('❌ /me route error:', error);
    res.status(500).json({ 
      success: false,
      message: "Server error fetching user data", 
      error: error.message 
    });
  }
});

// Logout route
router.post("/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;

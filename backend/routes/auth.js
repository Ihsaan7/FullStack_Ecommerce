import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
const userModel = "../models/user";

const router = express.Router();

function signToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRETJWT_SECRET_EXPIRY,
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

    body("name").notEmpty().withMessage("Name is required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],

  async (req, res) => {
    const { name, email, password } = req.body;

    const existing = await userModel.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Username already in use!" });

    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPass,
    });
    const token = signToken(user);

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = userModel.findOne({ email });

  if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

  const valid = bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid Credentials!" });

  const token = signToken(user);

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

//------ MIDDLEWARE NEEDS TO BE ADDED in this route-------------
router.get("/me", (req, res) => {
  res.json({ user: req.user });
});

export default router;

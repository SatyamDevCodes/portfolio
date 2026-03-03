// controllers/adminController.js
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import OTP from "../models/OTP.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";


// Send OTP
export const sendAdminOTP = async (req, res) => {
  const admin = await Admin.findOne();
  if (!admin) return res.status(404).json({ msg: "Admin not found" });

  const otp = generateOTP();

  await OTP.create({
    email: admin.email,
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  await sendEmail(admin.email, otp);

  res.json({ msg: "OTP sent to admin email" });
};

// Verify OTP
export const verifyAdminOTP = async (req, res) => {
  const { otp } = req.body;

  const record = await OTP.findOne({ otp });

  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  await OTP.deleteMany({ email: record.email });

  res.json({ msg: "OTP Verified" });
};


// Login with Password
export const loginAdmin = async (req, res) => {
  const { password } = req.body;

  const admin = await Admin.findOne();
  if (!admin) return res.status(404).json({ msg: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong Password" });

  // 🔥 Generate JWT
  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    msg: "Login Successful",
    token,
  });
};

// Forget Password
export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  const admin = await Admin.findOne();

  const hashed = await bcrypt.hash(newPassword, 10);

  admin.password = hashed;
  await admin.save();

  res.json({ msg: "Password Updated" });
};
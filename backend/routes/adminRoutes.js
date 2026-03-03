// routes/adminRoutes.js
import express from "express";
import { sendAdminOTP, verifyAdminOTP, loginAdmin, resetPassword, } from "../controllers/adminController.js";

const router = express.Router();

router.post("/send-otp", sendAdminOTP);
router.post("/verify-otp", verifyAdminOTP);
router.post("/login", loginAdmin);
router.post("/reset-password", resetPassword);

export default router;
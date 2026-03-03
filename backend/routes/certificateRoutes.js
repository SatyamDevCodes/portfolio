import express from "express";
import {addCertificate,getCertificates,deleteCertificate,} from "../controllers/certificateController.js";
import { upload } from "../middleware/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/certificates", getCertificates);

router.post("/certificates",adminAuth,upload.single("file"),addCertificate);

router.delete("/certificates/:id",adminAuth,deleteCertificate);

export default router;
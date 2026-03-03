import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio_certificates",
    resource_type: "auto", // 🔥 allows image + pdf
  },
});

const upload = multer({ storage });

export default upload;
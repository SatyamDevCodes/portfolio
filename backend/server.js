import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import projectRoute from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoute);
app.use("/api/education", educationRoutes);
app.use("/api", certificateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log("Server running on port 5000");
});
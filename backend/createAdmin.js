import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashed = await bcrypt.hash("MyPortfolio@Satyam9335", 10);

  await Admin.create({
    email: "satyammaurya182006@gmail.com",
    password: hashed,
    role: "admin",
  });

  console.log("Admin Created");
  process.exit();
};

createAdmin();
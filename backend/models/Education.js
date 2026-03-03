import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    degree: String,
    field: String,
    institution: String,
    location: String,
    graduationYear: String,
    cgpa: String,
    courses: [String],
}, { timestamps: true });


export default mongoose.model("Education", educationSchema);
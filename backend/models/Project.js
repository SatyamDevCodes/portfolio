import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    github: String,
    live: String,
    tags: [String],
}, { timestamps: true });


export default mongoose.model("Project", projectSchema);
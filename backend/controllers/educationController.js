import Education from "../models/Education.js";

export const getEducation = async (req, res) => {
    const educations = await Education.find().sort({ createdAt: -1 });
    res.json({ educations });
};

export const addEducation = async (req, res) => {
    const education = await Education.create(req.body);
    res.json(education);
};

export const updateEducation = async (req, res) => {
    const education = await Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(education);
};

export const deleteEducation = async (req, res) => {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project Deleted" });
};
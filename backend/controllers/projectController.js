import Project from "../models/Project.js";

export const getProject = async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
};

export const addProject = async (req, res) => {
    const project = await Project.create(req.body);
    res.json(project);
};

export const updateProject = async (req, res) => {
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(project);
};

export const deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project Deleted" });
};
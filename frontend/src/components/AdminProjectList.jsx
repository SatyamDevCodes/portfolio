"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Server = import.meta.env.VITE_SERVER_URL;

const AdminProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${Server}/api/projects`, {
                headers: { "Cache-Control": "no-cache" },
            });
            setProjects(res.data?.projects || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);
        setFormData(project);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `${Server}/api/projects/${editingId}`,
                formData
            );
            setEditingId(null);
            fetchProjects();
        } catch (error) {
            console.error("Update Error:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?"))
            return;

        try {
            await axios.delete(`${Server}/api/projects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">

                {projects.map((project) => (
                    <motion.article
                        key={project._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative rounded-xl border bg-card p-6"
                    >

                        {/* Edit Icon */}
                        <button
                            onClick={() => handleEdit(project)}
                            className="absolute top-4 right-4 text-primary hover:scale-110 transition"
                        >
                            <FaEdit />
                        </button>

                        {/* Image */}
                        <div className="aspect-video overflow-hidden rounded-md mb-4">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {editingId === project._id ? (
                            <>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full mb-2 p-2 border rounded"
                                />

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full mb-2 p-2 border rounded"
                                />

                                <input
                                    type="text"
                                    name="live"
                                    value={formData.live || ""}
                                    onChange={handleChange}
                                    placeholder="Live URL"
                                    className="w-full mb-2 p-2 border rounded"
                                />

                                <input
                                    type="text"
                                    name="github"
                                    value={formData.github || ""}
                                    onChange={handleChange}
                                    placeholder="GitHub URL"
                                    className="w-full mb-4 p-2 border rounded"
                                />

                                <button
                                    onClick={handleUpdate}
                                    className="bg-primary text-white px-4 py-2 rounded mr-2"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() => setEditingId(null)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold">
                                    {project.title}
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {project.description}
                                </p>

                                <div className="mt-4 flex gap-4">
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary text-sm"
                                        >
                                            Live
                                        </a>
                                    )}

                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground text-sm"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() =>
                                        handleDelete(project._id)
                                    }
                                    className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-700 text-sm"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </>
                        )}
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default AdminProjectList;
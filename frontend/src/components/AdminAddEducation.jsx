import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Server = import.meta.env.VITE_SERVER_URL;


const AdminAddEducation = ({ fetchEducations }) => {

    const token = localStorage.getItem("adminToken");

    const [form, setForm] = useState({
        degree: "",
        field: "",
        institution: "",
        location: "",
        graduationYear: "",
        cgpa: "",
        courses: [],
    });


    // 🔥 TAG STATES
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    // 🔥 TAG ADD LOGIC (Enter press)
    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();

            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }

            setTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };


    const addEducation = async () => {
        try {
            await axios.post(
                `${Server}/api/education`,
                { ...form, courses: tags },   // 🔥 tags send ho rahe hain
                {
                    headers: { authorization: token },
                }
            );

            setForm({
                degree: "",
                field: "",
                institution: "",
                location: "",
                graduationYear: "",
                cgpa: "",
                courses: "",
            });

            setTags([]);
            fetchEducations();

            toast.success("Education Added Successfully.", {
                duration: 4000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <div className="space-y-4 max-w-xl">
                <h2 className="text-2xl font-bold">Add Project</h2>

                <input
                    className="w-full rounded-md border p-3"
                    placeholder="Degree"
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                />

                <textarea
                    className="w-full rounded-md border p-3"
                    placeholder="Field"
                    value={form.field}
                    onChange={(e) => setForm({ ...form, field: e.target.value })}
                />

                <input
                    className="w-full rounded-md border p-3"
                    placeholder="Institute Name"
                    value={form.institution}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                />

                <input
                    className="w-full rounded-md border p-3"
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                />

                <input
                    className="w-full rounded-md border p-3"
                    placeholder="Graduation Year"
                    value={form.graduationYear}
                    onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                />

                <input
                    className="w-full rounded-md border p-3"
                    placeholder="CGPA"
                    value={form.cgpa}
                    onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
                />

                {/* 🔥 TAG INPUT FIELD */}
                <input
                    className="w-full rounded-md border p-3"
                    placeholder="Type courses and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                />

                {/* 🔥 TAG DISPLAY */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            onClick={() => removeTag(tag)}
                            className="cursor-pointer rounded bg-transparent text-white border border-primary px-3 py-1 text-sm font-light"
                        >
                            {tag}&nbsp;<span className='text-red-500'> ✕</span>
                        </span>
                    ))}
                </div>

                <button
                    onClick={addEducation}
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white"
                >
                    Add Education
                </button>
            </div>
        </div>
    )
}

export default AdminAddEducation

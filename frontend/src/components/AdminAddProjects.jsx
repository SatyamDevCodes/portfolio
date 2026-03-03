"use client";

import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';


const Server = import.meta.env.VITE_SERVER_URL;

const AdminAddProject = ({ fetchProjects }) => {
  const token = localStorage.getItem("adminToken");

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    live: "",
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

  const addProject = async () => {
    try {
      await axios.post(
        `${Server}/api/projects`,
        { ...form, tags },   // 🔥 tags send ho rahe hain
        {
          headers: { authorization: token },
        }
      );

      setForm({
        title: "",
        description: "",
        image: "",
        github: "",
        live: "",
      });

      setTags([]);
      fetchProjects();

      toast.success("Project Added Successfully.", {
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
    <div className="space-y-4 max-w-xl">
      <h2 className="text-2xl font-bold">Add Project</h2>

      <input
        className="w-full rounded-md border p-3"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full rounded-md border p-3"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full rounded-md border p-3"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <input
        className="w-full rounded-md border p-3"
        placeholder="Github URL"
        value={form.github}
        onChange={(e) => setForm({ ...form, github: e.target.value })}
      />

      <input
        className="w-full rounded-md border p-3"
        placeholder="Live URL"
        value={form.live}
        onChange={(e) => setForm({ ...form, live: e.target.value })}
      />

      {/* 🔥 TAG INPUT FIELD */}
      <input
        className="w-full rounded-md border p-3"
        placeholder="Type tag and press Enter"
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
            className="cursor-pointer rounded bg-transparent text-white border border-primary px-3 py-1 text-sm"
          >
            {tag} <span className="text-red-500 cursor-pointer"> ✕</span>
          </span>
        ))}
      </div>

      <button
        onClick={addProject}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Add Project
      </button>
    </div>
  );
};

export default AdminAddProject;
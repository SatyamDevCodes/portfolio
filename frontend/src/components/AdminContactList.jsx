import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Calendar, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Server = import.meta.env.VITE_SERVER_URL;


const AdminContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            const res = await axios.get(`${Server}/api/contacts`, {
                headers: { "Cache-Control": "no-cache" },
            });
            setContacts(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    //delete contact 
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Contact?"))
            return;

        try {
            await axios.delete(`${Server}/api/contacts/${id}`);
            fetchContact();
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    // Reply on email
    const handleReply = (email, name) => {
        const subject = encodeURIComponent("Reply to your message - Satyam's Portfolio");
        const body = encodeURIComponent(`Hi ${name},\n\n Thank you for reaching out...`);

        const mailText = `mailto:${email}?subject=${subject}&body=${body}`;
        navigator.clipboard.writeText(mailText).then(() => {
            toast.success("Email copied to your clipboard!", {
                duration: 4000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
        }).catch(err => {
            console.log("Clipboard copy failed:", err);
            prompt("Copy this manually \n\n" + mailText)
        })
    };


    return (
        <div className="min-h-screen bg-[#030712] text-white p-8 font-sans">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Contact Messages
                </h1>
                <p className="text-gray-400 mt-2">Manage and respond to your portfolio inquiries.</p>
            </motion.div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
                    <p className="text-gray-400 text-sm">Total Inquiries</p>
                    <p className="text-3xl font-bold text-cyan-400">{contacts?.length || 0}</p>
                </div>
            </div>

            {/* Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {contacts && contacts.map((contact, index) => (
                    <motion.div
                        key={contact._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-gray-900/40 border border-gray-800 hover:border-cyan-500/50 p-6 rounded-2xl transition-all duration-300 backdrop-blur-md overflow-hidden"
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                                    <p className="text-gray-500 text-sm flex items-center gap-1">
                                        <Mail size={12} /> {contact.email}
                                    </p>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-1 rounded-full uppercase tracking-widest">
                                {new Date(contact.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-cyan-400/80 text-sm font-medium">
                                <MessageSquare size={14} />
                                <span>Subject: {contact.subject}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm bg-black/20 p-4 rounded-xl border border-gray-800/50">
                                "{contact.message}"
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => handleReply(contact.email, contact.name)} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                Reply via Email
                            </button>
                            <button onClick={() => handleDelete(contact._id)} className="p-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminContactList;
import React from "react";
import { LayoutGrid, PlusCircle, Award, List, LogOut, GraduationCap, Contact } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <LayoutGrid size={20} /> },
    { id: "add-project", name: "Add Project", icon: <PlusCircle size={20} /> },
    { id: "project-list", name: "Project List", icon: <List size={20} /> },
    { id: "add-certificate", name: "Add Certificate", icon: <PlusCircle size={20} /> },
    { id: "certificate-list", name: "Certificates", icon: <Award size={20} /> },
    { id: "add-education", name: "Add Educations", icon: <PlusCircle size={20} /> },
    { id: "education-list", name: "Educations", icon: <GraduationCap size={20} /> },
    { id: "contacts", name: "Contacts", icon: <Contact size={20} /> },
  ];

  // LogOut 
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logout Success.", {
      duration: 4000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="w-64 bg-background/80 h-screen p-6 flex flex-col gap-8 shadow-xl fixed left-0 top-0 backdrop-blur-xl border-r border-border">
      <h2 className="text-2xl font-bold text-primary border-b border-slate-700 pb-4">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${activeTab === item.id
              ? "bg-primary text-black"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-700 pt-4">
        <button className="flex items-center gap-3 p-3 w-full text-slate-400 hover:text-red-400 transition">
          <LogOut size={20} />
          <span onClick={handleLogout}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
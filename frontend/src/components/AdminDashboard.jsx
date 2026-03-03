"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";

import AdminDashboardHome from "./AdminDashboardHome";
import AdminAddProject from "./AdminAddProjects";
import AdminAddCertificate from "./AdminAddCertificates";
import AdminProjectList from "./AdminProjectList";
import AdminCertificateList from "./AdminCertificateList";
import AdminAddEducation from "./AdminAddEducation";
import AdminEducationList from "./AdminEducationList";
import AdminContactList from "./AdminContactList";

const Server = import.meta.env.VITE_SERVER_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [education, setEducation] = useState([]);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const fetchProjects = async () => {
    const res = await axios.get(`${Server}/api/projects`);
    setProjects(res.data);
  };

  const fetchCertificates = async () => {
    const res = await axios.get(`${Server}/api/certificates`);
    setCertificates(res.data);
  };

  const fetchEducations = async () => {
    const res = await axios.get(`${Server}/api/education`);
    setEducation(res.data);
  };

  const fetchContacts = async () => {
    const res = await axios.get(`${Server}/api/contacts`);
    setContact(res.data);
  }

  useEffect(() => {
    fetchProjects();
    fetchCertificates();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <AdminDashboardHome
            projects={projects}
            certificates={certificates}
          />
        );

      case "add-project":
        return <AdminAddProject fetchProjects={fetchProjects} />;

      case "project-list":
        return (
          <AdminProjectList
            projects={projects}
            fetchProjects={fetchProjects}
          />
        );

      case "add-certificate":
        return (
          <AdminAddCertificate
            fetchCertificates={fetchCertificates}
          />
        );

      case "certificate-list":
        return (
          <AdminCertificateList
            certificates={certificates}
            fetchCertificates={fetchCertificates}
          />
        );

      case "add-education":
        return (
          <AdminAddEducation
            fetchEducations={fetchEducations}
          />
        )

      case "education-list":
        return (
          <AdminEducationList
            education={education}
            fetchEducations={fetchEducations}
          />
        );

      case "contacts":
        return (
          <AdminContactList
            contact={contact}
            fetchContacts={fetchContacts}
          />
        )

      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="ml-64 w-full p-10 bg-background min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
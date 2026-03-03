import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';


const Server = import.meta.env.VITE_SERVER_URL;

const AdminAddCertificate = ({ fetchCertificates }) => {
  const token = localStorage.getItem("adminToken");

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState(null);

  const addCertificate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("issuer", issuer);
    formData.append("file", file);

    await axios.post(
      `${Server}/api/certificates`,
      formData,
      {
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setTitle("");
    setIssuer("");
    setFile(null);
    fetchCertificates();
    toast.success("Certificate Added.", {
      duration: 4000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-2xl font-bold">Add Certificate</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded-md"
      />

      <input
        placeholder="Issuer"
        value={issuer}
        onChange={(e) => setIssuer(e.target.value)}
        className="w-full border p-3 rounded-md"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
      />

      <button
        onClick={addCertificate}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Upload Certificate
      </button>
    </div>
  );
};

export default AdminAddCertificate;
"use client";

import axios from "axios";
import toast from 'react-hot-toast';


const Server = import.meta.env.VITE_SERVER_URL;

const AdminCertificateList = ({ certificates, fetchCertificates }) => {
  const token = localStorage.getItem("adminToken");

  const deleteCertificate = async (id) => {
    try {
      await axios.delete(`${Server}/api/certificates/${id}`, {
        headers: { authorization: token },
      });

      fetchCertificates();
      toast.success("Certificate Deleted ✅", {
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
      <h2 className="text-3xl font-bold mb-8">Certificates</h2>

      {certificates.length === 0 && (
        <p className="text-gray-500">
          No certificates added yet.
        </p>
      )}

      <div className="space-y-6">
        {certificates.map((cert) => {
          const isPDF =
            cert.file && cert.file.toLowerCase().includes(".pdf");

          return (
            <div
              key={cert._id}
              className="border rounded-xl p-6 shadow-sm bg-card"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {cert.title}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {cert.issuer}
                  </p>
                </div>

                <button
                  onClick={() => deleteCertificate(cert._id)}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>

              {/* View Section */}
              <div className="mt-4">
                {isPDF ? (
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <img
                    src={cert.file}
                    alt={cert.title}
                    className="max-h-48 rounded-md border"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminCertificateList;
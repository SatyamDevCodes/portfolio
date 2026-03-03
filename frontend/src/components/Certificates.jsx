"use client"

import { useEffect, useState } from "react";
import axios from "axios";

const Server = import.meta.env.VITE_SERVER_URL;

const Certificates = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      const res = await axios.get(`${Server}/api/certificates`);
      setCerts(res.data);
    };
    fetchCerts();
  }, []);

  return (
    <section id="certificates" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-3xl font-bold text-center">
          Certificates
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {certs?.map((cert) => (
            <div
              key={cert._id}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              {cert.fileType?.includes("pdf") ? (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary underline"
                >
                  View PDF
                </a>
              ) : (
                <img
                  src={cert.file}
                  alt={cert.title}
                  className="mb-4 rounded-md"
                />
              )}

              <h3 className="font-semibold">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">
                {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
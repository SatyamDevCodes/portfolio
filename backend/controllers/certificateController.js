import { Certificate } from "../models/Certificate.js";

/* ================= ADD CERTIFICATE ================= */

export const addCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const certificate = await Certificate.create({
      title: req.body.title,
      issuer: req.body.issuer,
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    res.status(201).json({
      message: "Certificate Added",
      certificate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET CERTIFICATES ================= */

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();

    const formattedCertificates = certificates.map((cert) => ({
      _id: cert._id,
      title: cert.title,
      issuer: cert.issuer,
      file: `data:${cert.file.contentType};base64,${cert.file.data.toString(
        "base64"
      )}`,
    }));

    res.status(200).json(formattedCertificates);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= DELETE CERTIFICATE ================= */

export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
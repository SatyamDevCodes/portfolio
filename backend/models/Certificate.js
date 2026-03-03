import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    file: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model(
  "Certificate",
  certificateSchema
);
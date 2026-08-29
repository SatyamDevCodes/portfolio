"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
 
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-border px-6 py-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          {"Designed & Built by "}
          <span className="text-primary">Satyam</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} Satyam. All rights reserved.`}
        </p>
      </div>
    </motion.footer>
  )
}
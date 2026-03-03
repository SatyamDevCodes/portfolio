"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const Server = import.meta.env.VITE_SERVER_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

 const EducationSection=()=> {

      const [educations, setEducations] = useState([]);

        useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async () => {
        try {
            const res = await axios.get(`${Server}/api/education`, {
                headers: { "Cache-Control": "no-cache" },
            });
            setEducations(res.data?.educations || []);
        } catch (error) {
            console.log(error);

        }
    };

  return (
    <section id="education" className="relative px-6 py-24 md:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Academic Background
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Education & Qualifications</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            My educational journey and academic achievements that shaped my career in technology.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {educations.map((edu, index) => (
            <motion.div
              key={edu.institution}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/40"
            >
              {/* Timeline line and dot */}
              <div className="absolute left-6 top-0 md:left-8">
                <div className="flex flex-col items-center">
                  <div className="h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  {index < educations.length - 1 && (
                    <div className="mt-6 h-24 w-0.5 bg-linear-to-b from-primary to-primary/20" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="ml-8 md:ml-12">
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{edu.field}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {edu.graduationYear}
                  </div>
                </div>

                {/* Institution and Location */}
                <div className="mb-4 flex flex-col gap-1">
                  <p className="text-base text-foreground font-medium">{edu.institution}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {edu.location}
                  </div>
                </div>

                {/* GPA/Score */}
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 w-fit">
                  <span className="text-xs text-muted-foreground">Performance:</span>
                  <span className="font-semibold text-foreground">{edu.cgpa}</span>
                </div>

                {/* Relevant Courses/Subjects */}
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Key Courses/Subjects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course) => (
                      <span
                        key={course}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-secondary-foreground transition-colors duration-200 group-hover:border-primary/30"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default EducationSection;
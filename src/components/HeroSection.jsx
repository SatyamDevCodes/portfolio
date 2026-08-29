"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(210_15%_18%/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(210_15%_18%/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
          Available for freelance work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl"
        >
          <span className="text-balance">
            {"Hi, I'm "}
            <span className="text-primary">Satyam</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Full Stack Developer specializing in building exceptional digital
          experiences. I craft clean, performant, and accessible web
          applications with modern technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-border bg-transparent px-8 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary hover:text-primary"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {["React", "Express.js", "Node.js", "MongoDB", "Tailwind CSS"].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-secondary/30 px-4 py-1.5 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <motion.a
            href="#projects"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex flex-col items-center gap-2 text-xs text-muted-foreground"
            aria-label="Scroll to projects"
          >
            <span>Scroll Down</span>
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
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

// WhatsApp Contact
const phoneNumber = "9335020580"

const message = `Hello,
I saw your portfolio and I am interested in hiring you for a project.
Please share your availability and details.`

const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigate = useNavigate()
  const adminToken = localStorage.getItem("adminToken")

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logout Success.", {
      duration: 4000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
    navigate("/")
    window.location.reload()
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <motion.a
          href="#home"
          className="font-heading text-xl font-bold text-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-primary">{"<"}</span>
          Satyam
          <span className="text-primary">{"/>"}</span>
        </motion.a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {link.name}
              </a>
            </li>
          ))}

          {/* ✅ If Admin Logged In */}
          {adminToken ? (
            <>
              <li>
                <button
                  onClick={() => navigate("/admin-dashboard")}
                  className="text-sm text-primary font-medium"
                >
                  Admin
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            /* ✅ Default Hire Me */
            <li>
              <a
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90"
              >
                Hire Me
              </a>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-foreground"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-foreground"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-foreground"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-base text-muted-foreground transition-colors duration-200 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}

              {adminToken ? (
                <>
                  <motion.li>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        navigate("/admin-dashboard")
                      }}
                      className="text-base text-primary font-medium"
                    >
                      Admin
                    </button>
                  </motion.li>

                  <motion.li>
                    <button
                      onClick={handleLogout}
                      className="inline-block rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                    >
                      Logout
                    </button>
                  </motion.li>
                </>
              ) : (
                <motion.li>
                  <a
                    href={whatsappURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hire Me
                  </a>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
"use client"

import Navbar from "./NavBar"
import HeroSection from "./HeroSection"
import ProjectsSection from "./ProjectsSection"
import SkillsSection from "./SkillsSection"
import EducationSection from "./EducationSection"
import ContactSection from "./ContactSection"
import Footer from "./Footer"
import Certificates from "./Certificates";

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection/>
      <Certificates/>
      <ContactSection />
      <Footer />
    </main>
  )
}
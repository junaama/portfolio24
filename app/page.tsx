"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

// Sample data for projects
const projects = [
  {
    title: "Project 1",
    description: "A brief description of Project 1",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/project1",
    demo: "https://project1-demo.com",
  },
  {
    title: "Project 2",
    description: "A brief description of Project 2",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/project2",
    demo: "https://project2-demo.com",
  },
  {
    title: "Project 3",
    description: "A brief description of Project 3",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/project3",
    demo: "https://project3-demo.com",
  },
]

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Portfolio() {
  const aboutRef = useRef(null)
  const portfolioRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)
  const resumeRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true, amount: 0.5 })
  const portfolioInView = useInView(portfolioRef, { once: true, amount: 0.5 })
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.5 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.5 })
  const resumeInView = useInView(resumeRef, { once: true, amount: 0.5 })
  const [email, setEmail] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")

  const handleResumeRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address.")
      return
    }

    try {
      const response = await fetch('/api/send-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success("Resume link sent to your email!")
        setEmail("")
      } else {
        toast.error("Failed to send resume. Please try again.")
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("An error occurred. Please try again later.")
    }
  }
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error("Please fill in all fields.")
      return
    }

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
      })

      if (response.ok) {
        toast.success("Message sent successfully!")
        setContactName("")
        setContactEmail("")
        setContactMessage("")
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error("An error occurred. Please try again later.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 text-blue-900">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center bg-blue-100">
        <nav className="flex gap-4 sm:gap-6">
  
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="#portfolio">
            Portfolio
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="#skills">
            Skills
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <motion.section
          id="about"
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center"
        >
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-600">
                {process.env.NEXT_PUBLIC_NAME}
              </h1>
              <p className="mx-auto max-w-[700px] text-blue-700 md:text-xl">
                I am a software engineer specializing in full-stack web and mobile development. I create scalable, high-performance applications with a focus on user experience, optimization and accessibility.
              </p>
            </div>
          </div>
        </motion.section>
        <motion.section
          id="portfolio"
          ref={portfolioRef}
          initial="hidden"
          animate={portfolioInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100 flex items-center justify-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-black ">My Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {projects.map((project, index) => (
                <Card key={index} className="bg-white  transition-colors duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className=" text-center">{project.title}</CardTitle>
                    <CardDescription className=" text-center">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-[200px] object-cover rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    <Button asChild variant="outline" className="">
                      <Link href={project.github}>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                    <Button asChild className="">
                      <Link href={project.demo}>Demo</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section
          id="skills"
          ref={skillsRef}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-100 flex items-center justify-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-blue-800">My Skills</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
              {["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js", "Git"].map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 bg-white rounded-md text-blue-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section
    id="contact"
    ref={contactRef}
    initial="hidden"
    animate={contactInView ? "visible" : "hidden"}
    variants={fadeInUpVariants}
    className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100 flex items-center justify-center"
  >
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-black">Contact Me</h2>
      <form onSubmit={handleContactSubmit} className="max-w-md mx-auto space-y-4">
        <Input 
          placeholder="Your Name" 
          className="bg-white" 
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
        />
        <Input 
          type="email" 
          placeholder="Your Email" 
          className="bg-white" 
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
        <Textarea 
          placeholder="Your Message" 
          className="bg-white" 
          value={contactMessage}
          onChange={(e) => setContactMessage(e.target.value)}
          required
        /> <div className="flex justify-center">
        <Button type="submit" className="">Send Message</Button>
      </div>
    </form>
  </div>
</motion.section>
        <motion.section
          id="request-resume"
          ref={resumeRef}
          initial="hidden"
          animate={resumeInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 flex items-center justify-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-blue-800">Request My Resume</h2>
            <form onSubmit={handleResumeRequest} className="max-w-md mx-auto space-y-4">
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-white border-blue-300 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Request Resume
              </Button>
            </form>
          </div>
        </motion.section>
      </main>
      <footer className="py-6 w-full shrink-0 flex items-center justify-center px-4 md:px-6 border-t border-blue-200 bg-blue-50">
        <div className="text-center">
          <p className="text-xs text-blue-600 mb-4">© 2024 {process.env.NEXT_PUBLIC_NAME}. All rights reserved.</p>
          <nav className="flex justify-center gap-4 sm:gap-6">
            <Link className="text-blue-600 hover:text-blue-800" href={process.env.NEXT_PUBLIC_GITHUB || ""}>
              <span className="sr-only">GitHub</span>
              <Github className="h-4 w-4" />
            </Link>
            <Link className="text-blue-600 hover:text-blue-800" href={process.env.NEXT_PUBLIC_LINKEDIN || ""
            }>
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link className="text-blue-600 hover:text-blue-800" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}` || ""}>
              <span className="sr-only">Email</span>
              <Mail className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
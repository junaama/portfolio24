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


const projects = [
  {
    title: "iluvwords",
    description: "word games all based on a word of the day",
    image: "/iluvwords.png",
    github: "https://github.com/junaama/iluvwords",
    demo: "https://iluvwords.vercel.com",
  },
  {
    title: "ChatIsland",
    description: "A chatbot designed to go vacation-mode and provide a relaxing and fun conversation experience.",
    image: "/chatisland.png",
    github: "https://github.com/junaama/chatbot-th",
    demo: "https://nextjs-fastapi-starter-kappa-three.vercel.app/",
  },
  {
    title: "Threads of Tech Job Board",
    description: "Job board featuring fashion-tech opportunities",
    image: "/jobboard.png",
    github: "",
    demo: "https://jobs.threadsoftech.com/"
  },
  {
    title: "PULP: Private Uncollateralized Lending Protocol",
    description: "I used Solidity & Foundry to develop the smart contract for a lending model using self-sovereign identification.",
    image: "https://res.cloudinary.com/dzfyk3r12/image/upload/v1673550276/projects_2Fbfx1i_2Fimages_2FScreen_20Shot_202022-10-08_20at_209.53.07_20PM_yawemf.png",
    github: "https://github.com/akerbabber/PULP-blockchain",
    demo: "https://ethglobal.com/showcase/pulp-bfx1i",
  },
  {
    title: "Coven Cats",
    description: "I used NextJS, Typescript, Foundry, Solidity, Infura, to develop this project. Explored upgradeable contracts and web3 libraries.",
    image: "https://res.cloudinary.com/dzfyk3r12/image/upload/v1673549802/Screen_Shot_2023-01-12_at_1.55.39_PM_yvvcvr.png",
    github: "https://github.com/yourusername/project1",
    demo: "https://covencats.xyz",
  },
  {
    title: "Mighty Axolotl",
    description: "An NFT collection built with Solidity, React, and Typescript",
    image: "https://res.cloudinary.com/dzfyk3r12/image/upload/v1630465097/Screen_Shot_2021-08-31_at_7.49.27_PM_vtd39o.png",
    github: "https://github.com/junaama/mightyaxolotl-webapp",
    demo: "https://mightyaxolotl.com",
  },
  {
    title: "Axess",
    description: "Axess takes advantage of the popularity of tools such as CodePen and JSBin among those learning web development by offering an NPM Package that allows for seamless integration of online IDE's into a web accessibility education tool. This low-overhead solution may be an opportunity to introduce millions of aspiring web developers, regardless of background, to web accessibility.",
    // image: "/placeholder.svg",
    github: "https://github.com/omerdemirkan/axess",
    demo: "https://www.npmjs.com/package/axess",
  },
  {
    title: "Moonstock",
    description: "MoonStock pulls up-to-date data from Reddit and Twitter, finds the sentiment of the comments/tweets, and provides a recommendation to Buy, Hold, or Sell based on the net sentiment, confidence score, and top comments from social media platforms like Twitter and Reddit.",
    image: "/moonstock.png",
    github: "https://github.com/junaama/hackillinois",
    demo: "https://moonstock.netlify.app/",
  },
  {
    title: "Mood Verse",
    description: "Mood verse will generate a verse from the bible based on your mood! You can state your mood through a text input, or speech input.",
    image: "https://res.cloudinary.com/dzfyk3r12/image/upload/v1598052284/Screenshot_from_2020-08-21_19-20-13_c7a0bz.png",
    github: "https://github.com/junaama/Mood-Verse",
    demo: "https://mood-verse.herokuapp.com/",
  },
  {
    title: "Covid-18+",
    description: "Dating application with a COVID-19 theme",
    image: "https://res.cloudinary.com/dzfyk3r12/image/upload/v1595628782/Screenshot_from_2020-07-24_18-11-19_pblfld.png",
    github: "https://github.com/junaama/COVID-18-",
    demo: "https://covating-app.netlify.app/",
  },
  {
    title: "Word Finder",
    description: "Find words based on a set of linguistic constraints!",
    image: "https://res.cloudinary.com/dzfyk3r12/image/upload/v1595628780/Screenshot_from_2020-07-24_18-10-52_wdd9xb.png",
    github: "https://github.com/junaama/word-finder",
    demo: "https://wordfinder.netlify.app/",
  },
]

const mySkills = ["JavaScript", "React", "Typescript", "SQL/NoSQL", "Next JS", "GraphQL", "TailwindCSS", "Node JS", "Google Cloud/AWS", "Python", "Django", "FastAPI", "Docker", "Swift"]

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
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="#portfolio" >
            Portfolio
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="#skills" >
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
          animate="visible"
          variants={fadeInUpVariants}
          className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100 flex items-center justify-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-black ">My Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {projects.map((project, index) => (
                <Card key={index} className="bg-white transition-colors duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className=" text-center">{project.title}</CardTitle>
                    <CardDescription className=" text-center">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    {project.image && <Image
                      src={project.image}
                      alt={project.title}
                      width={640}
                      height={300}
                      className="w-full  object-cover rounded-md"
                    />}
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    <Button asChild variant="outline" className="">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                    <Button asChild className="">
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">Demo</Link>
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
              {mySkills.map((skill, index) => (
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
            <Link className="text-blue-600 hover:text-blue-800" href={process.env.NEXT_PUBLIC_GITHUB || ""} target="_blank" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>
              <Github className="h-4 w-4" />
            </Link>
            <Link className="text-blue-600 hover:text-blue-800" href={process.env.NEXT_PUBLIC_LINKEDIN || ""} target="_blank" rel="noopener noreferrer">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link className="text-blue-600 hover:text-blue-800" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}` || ""} target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Email</span>
              <Mail className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
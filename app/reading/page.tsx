"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function ReadingPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const router = useRouter()

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleBack = () => {
    router.back()
  }

  const questions = [
    {
      question: "What programming languages are you proficient in?",
      answer:
        "Proficient in JavaScript, Python, Java, and TypeScript with extensive experience in modern frameworks like React, Vue.js, and Node.js for building scalable web applications.",
    },
    {
      question: "What is your experience with database management?",
      answer:
        "Experienced with SQL and NoSQL databases including MySQL, PostgreSQL, MongoDB, and Redis. Skilled in database design, optimization, and performance tuning.",
    },
    {
      question: "How do you approach problem-solving in software development?",
      answer:
        "I follow a systematic approach: understanding requirements, breaking down complex problems, researching solutions, implementing with clean code, and thorough testing.",
    },
    {
      question: "What is your experience with version control systems?",
      answer:
        "Proficient with Git and GitHub for version control, branching strategies, code reviews, and collaborative development workflows in team environments.",
    },
    {
      question: "How do you ensure code quality and maintainability?",
      answer:
        "I implement unit testing, follow coding standards, conduct code reviews, use linting tools, and write comprehensive documentation for long-term maintainability.",
    },
    {
      question: "What is your experience with cloud platforms?",
      answer:
        "Experienced with AWS, Azure, and Google Cloud Platform for deploying applications, managing infrastructure, and implementing CI/CD pipelines.",
    },
    {
      question: "How do you stay updated with new technologies?",
      answer:
        "I regularly read tech blogs, participate in developer communities, attend conferences, take online courses, and work on personal projects to explore new technologies.",
    },
    {
      question: "What is your experience with agile development methodologies?",
      answer:
        "Experienced with Scrum and Kanban methodologies, participating in sprint planning, daily standups, retrospectives, and delivering iterative solutions.",
    },
    {
      question: "How do you handle tight deadlines and pressure?",
      answer:
        "I prioritize tasks effectively, communicate proactively with stakeholders, break down work into manageable chunks, and maintain focus on delivering quality results.",
    },
    {
      question: "What motivates you in your software development career?",
      answer:
        "I'm motivated by solving complex problems, creating innovative solutions, continuous learning, and building applications that make a positive impact on users' lives.",
    },
    {
      question: "How do you approach learning new programming languages or frameworks?",
      answer:
        "I start with official documentation, build small projects, join community forums, watch tutorials, and gradually apply new concepts to real-world scenarios.",
    },
    {
      question: "What are your long-term career goals in software development?",
      answer:
        "I aim to become a technical leader, mentor junior developers, contribute to open-source projects, and eventually lead innovative product development initiatives.",
    },
  ]

  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: "url('/images/gradient-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header with Smooth Fade Mask */}
      <div className="sticky top-0 w-full z-20">
        {/* Smooth Fade Mask */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(180deg, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 70%, transparent 100%)'
          }}
        ></div>
        
        {/* Header Content */}
        <div className="relative flex items-center px-4 bg-gradient-to-b from-neutral-600/40 via-neutral-700/20 to-transparent pt-5 pb-8 gap-4">
          <motion.div 
            className="p-2 rounded-[40px] inline-flex justify-center items-center cursor-pointer"
            onClick={handleBack}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
              background: 'linear-gradient(143deg, rgba(255, 255, 255, 0.37) -3.54%, rgba(114, 114, 114, 0.42) 95.15%)',
              boxShadow: '0px 1.127px 3.381px 0px rgba(255, 255, 255, 0.25) inset, 0px 0.501px 12.022px -0.501px rgba(0, 0, 0, 0.18)',
              backdropFilter: 'blur(29.01752471923828px)',
              WebkitBackdropFilter: 'blur(29.01752471923828px)',
              borderImage: 'linear-gradient(143deg, #333333 0%, #EDEDED 32.43%, #FFFFFF 70%) 1'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <h1 className="text-2xl font-medium text-white">
            Read me
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-32 space-y-12">
        {questions.map((item, index) => (
          <motion.div 
            key={index} 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (index * 0.05) }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-gray-400 text-base leading-relaxed">
              {index + 1}. {item.question}
            </div>
            <div className="text-white text-2xl leading-relaxed font-normal">
              {item.answer}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pause/Play Button */}
      <div className="fixed bottom-9 right-6">
        <motion.button
          onClick={togglePlayPause}
          className="flex-1 p-3 rounded-[63.49px] flex justify-center items-center gap-1.5"
          style={{ backgroundColor: "#00D128" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          {isPlaying ? (
            <>
              <motion.div 
                className="w-6 h-6 relative overflow-hidden flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-1 h-4 bg-white rounded-sm"></div>
                <div className="w-1 h-4 bg-white rounded-sm ml-1"></div>
              </motion.div>
              <div className="text-center justify-center text-white text-base leading-snug">Pause</div>
            </>
          ) : (
            <>
              <motion.svg 
                width="25" 
                height="24" 
                viewBox="0 0 25 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                whileTap={{ scale: 0.9 }}
              >
                <path d="M10.0765 2.53365C8.07781 1.29918 5.5 2.73688 5.5 5.08605V18.914C5.5 21.2632 8.07781 22.7009 10.0765 21.4664L21.2705 14.5524C23.1686 13.3801 23.1686 10.6199 21.2705 9.44763L10.0765 2.53365Z" fill="white"/>
              </motion.svg>
              <div className="text-center justify-center text-white text-base leading-snug">Play</div>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

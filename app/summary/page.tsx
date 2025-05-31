"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AnimatedMarkdown } from "flowtoken"

export default function SummaryPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const summaryPoints = [
    {
      content: "**Technical Expertise:** Proficient in JavaScript, Python, Java, and TypeScript with extensive experience in modern frameworks like React, Vue.js, and Node.js for building scalable web applications.",
      animation: "fadeIn"
    },
    {
      content: "**Database Management:** Experienced with SQL and NoSQL databases including MySQL, PostgreSQL, MongoDB, and Redis. Skilled in database design, optimization, and performance tuning.",
      animation: "fadeIn"
    },
    {
      content: "**Problem-Solving Approach:** Follow systematic problem-solving approach with clean code implementation and thorough testing. Proficient with Git, GitHub, and collaborative development workflows.",
      animation: "fadeIn"
    },
    {
      content: "**Quality Assurance:** Implement comprehensive quality assurance through unit testing, code reviews, linting tools, and documentation. Experienced with AWS, Azure, and Google Cloud Platform.",
      animation: "fadeIn"
    },
    {
      content: "**Project Management:** Experienced with Scrum and Kanban methodologies, effective deadline management, and continuous learning through tech communities and personal projects.",
      animation: "fadeIn"
    },
    {
      content: "**Career Vision:** Motivated by solving complex problems, creating innovative solutions, and building applications that make positive impact. Goal to become technical leader and mentor.",
      animation: "fadeIn"
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
      {/* Landscape Rotation Message */}
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[100] landscape:flex portrait:hidden">
        <div className="text-center px-8">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-2xl font-medium mb-2">Rotate Your Device</h2>
          <p className="text-gray-300">Please rotate your device to portrait mode for the best experience</p>
        </div>
      </div>

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
        <div className="relative flex items-center px-4 bg-gradient-to-b from-black/40 via-black/20 to-transparent pt-5 pb-8 gap-4">
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
            Summary
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-32 space-y-8">
        {summaryPoints.map((point, index) => (
          <motion.div 
            key={index} 
            className="text-white text-lg leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (index * 0.05) }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatedMarkdown
              content={point.content}
              animation={point.animation}
              animationDuration="0.6s"
              animationTimingFunction="ease-in"
              sep="word"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

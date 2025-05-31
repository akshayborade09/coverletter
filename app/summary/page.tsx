"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { TextEffect } from "@/components/motion-primitives/text-effect"

export default function SummaryPage() {
  const router = useRouter()

  const summaryContent = `**Technical Expertise:** Proficient in JavaScript, Python, Java, and TypeScript with extensive experience in modern frameworks like React, Vue.js, and Node.js for building scalable web applications. **Database Management:** Experienced with SQL and NoSQL databases including MySQL, PostgreSQL, MongoDB, and Redis. Skilled in database design, optimization, and performance tuning. **Problem-Solving Approach:** Follow systematic problem-solving approach with clean code implementation and thorough testing. Proficient with Git, GitHub, and collaborative development workflows. **Quality Assurance:** Implement comprehensive quality assurance through unit testing, code reviews, linting tools, and documentation. Experienced with AWS, Azure, and Google Cloud Platform. **Project Management:** Experienced with Scrum and Kanban methodologies, effective deadline management, and continuous learning through tech communities and personal projects. **Career Vision:** Motivated by solving complex problems, creating innovative solutions, and building applications that make positive impact. Goal to become technical leader and mentor.`

  const handleBack = () => {
    router.back()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.1
      }
    }
  }

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
          <div 
            className="p-2 rounded-[40px] inline-flex justify-center items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
            onClick={handleBack}
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
          </div>
          <h1 className="text-2xl font-medium text-white">
            Summary
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-32">
        <div className="text-white text-lg leading-relaxed font-light">
          <TextEffect
            per="word"
            preset="fade"
            speedReveal={12}
            className="text-white/70 text-xl  leading-9 font-light whitespace-pre-line"
          >
            {summaryContent}
          </TextEffect>
        </div>
      </div>
    </div>
  )
}

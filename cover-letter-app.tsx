"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import BottomNavigation from "@/components/BottomNavigation"

export default function Component() {
  const router = useRouter()

  const handleReadMe = () => {
    router.push("/reading")
  }

  const handleSummarise = () => {
    router.push("/summary")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Akshay's Cover Letter",
          text: "Check out Akshay's interactive cover letter showcasing technical expertise and experience",
          url: window.location.href
        })
      } catch (error) {
        console.log('Share was cancelled or failed:', error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(window.location.href)
          alert('Link copied to clipboard!')
        } catch (error) {
          console.log('Copy failed:', error)
        }
      }
    }
  }

  const questions = [
    {
      question: "1. What programming languages are you proficient in?",
      answer: "Proficient in JavaScript, Python, Java, and TypeScript with extensive experience in modern frameworks like React, Vue.js, and Node.js for building scalable web applications."
    },
    {
      question: "2. What is your experience with database management?",
      answer: "Experienced with SQL and NoSQL databases including MySQL, PostgreSQL, MongoDB, and Redis. Skilled in database design, optimization, and performance tuning."
    },
    {
      question: "3. How do you approach problem-solving in software development?",
      answer: "I follow a systematic approach: understanding requirements, breaking down complex problems, researching solutions, implementing with clean code, and thorough testing."
    },
    {
      question: "4. What is your experience with version control systems?",
      answer: "Proficient with Git and GitHub for version control, branching strategies, code reviews, and collaborative development workflows in team environments."
    },
    {
      question: "5. How do you ensure code quality and maintainability?",
      answer: "I implement unit testing, follow coding standards, conduct code reviews, use linting tools, and write comprehensive documentation for long-term maintainability."
    },
    {
      question: "6. What is your experience with cloud platforms?",
      answer: "Experienced with AWS, Azure, and Google Cloud Platform for deploying applications, managing infrastructure, and implementing CI/CD pipelines."
    },
    {
      question: "7. How do you stay updated with new technologies?",
      answer: "I regularly read tech blogs, participate in developer communities, attend conferences, take online courses, and work on personal projects to explore new technologies."
    },
    {
      question: "8. What is your experience with agile development methodologies?",
      answer: "Experienced with Scrum and Kanban methodologies, participating in sprint planning, daily standups, retrospectives, and delivering iterative solutions."
    },
    {
      question: "9. How do you handle tight deadlines and pressure?",
      answer: "I prioritize tasks effectively, communicate proactively with stakeholders, break down work into manageable chunks, and maintain focus on delivering quality results."
    },
    {
      question: "10. What motivates you in your software development career?",
      answer: "I'm motivated by solving complex problems, creating innovative solutions, continuous learning, and building applications that make a positive impact on users' lives."
    },
    {
      question: "11. How do you approach learning new programming languages or frameworks?",
      answer: "I start with official documentation, build small projects, join community forums, watch tutorials, and gradually apply new concepts to real-world scenarios."
    },
    {
      question: "12. What are your long-term career goals in software development?",
      answer: "I aim to become a technical leader, mentor junior developers, contribute to open-source projects, and eventually lead innovative product development initiatives."
    }
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
        <div className="relative flex justify-between items-center px-6 bg-gradient-to-b from-black/20 via-black/20 to-transparent pt-5 pb-8">
          <h1 className="text-2xl font-medium text-white">Akshay's Cover Letter</h1>
          <div 
            className="p-2 rounded-[40px] inline-flex justify-start items-center gap-2.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            onClick={handleShare}
            style={{
              background: 'linear-gradient(143deg, rgba(255, 255, 255, 0.37) -3.54%, rgba(114, 114, 114, 0.42) 95.15%)',
              boxShadow: '0px 1.127px 3.381px 0px rgba(255, 255, 255, 0.25) inset, 0px 0.501px 12.022px -0.501px rgba(0, 0, 0, 0.18)',
              backdropFilter: 'blur(29.01752471923828px)',
              WebkitBackdropFilter: 'blur(29.01752471923828px)',
              borderImage: 'linear-gradient(143deg, #333333 0%, #EDEDED 32.43%, #FFFFFF 70%) 1'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12.75V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V12.75M12 4V15.25M12 4L16.5 8.5M12 4L7.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-3 pb-32">
        {questions.map((question, index) => (
          <div 
            key={index}
            className="self-stretch p-4 rounded-3xl inline-flex flex-col justify-center items-start gap-4 transition-transform hover:scale-[1.02] active:scale-98"
            style={{
              background: 'linear-gradient(118deg, rgba(235, 235, 235, 0.15) 1.53%, rgba(224, 224, 224, 0.14) 19.05%, rgba(212, 212, 212, 0.11) 40.83%, rgba(207, 207, 207, 0.09) 48.89%, rgba(202, 202, 202, 0.07) 61.66%, rgba(200, 200, 200, 0.06) 81.54%, rgba(196, 196, 196, 0.05) 100%)',
              boxShadow: '0px 1.763px 42.32px -1.763px rgba(0, 0, 0, 0.18)',
              backdropFilter: 'blur(21.160106658935547px)',
              WebkitBackdropFilter: 'blur(21.160106658935547px)'
            }}
          >
            <div className="self-stretch opacity-60 justify-start text-white text-sm leading-tight font-open-sauce font-normal">
              {question.question}
            </div>
            <div className="self-stretch justify-start text-white text-base leading-normal font-open-sauce font-normal">
              {question.answer}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <BottomNavigation
        leftButton={{
          label: "Summarise",
          onClick: handleSummarise,
          icon: (
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 5C4.5 3.34315 5.84315 2 7.5 2H17.5C19.1569 2 20.5 3.34315 20.5 5V19C20.5 20.6569 19.1569 22 17.5 22H7.5C5.84315 22 4.5 20.6569 4.5 19V5ZM9.5 6C8.94772 6 8.5 6.44772 8.5 7C8.5 7.55228 8.94772 8 9.5 8H15.5C16.0523 8 16.5 7.55228 16.5 7C16.5 6.44772 16.0523 6 15.5 6H9.5ZM9.5 10C8.94772 10 8.5 10.4477 8.5 11C8.5 11.5523 8.94772 12 9.5 12H15.5C16.0523 12 16.5 11.5523 16.5 11C16.5 10.4477 16.0523 10 15.5 10H9.5ZM9.5 14C8.94772 14 8.5 14.4477 8.5 15C8.5 15.5523 8.94772 16 9.5 16H11.5C12.0523 16 12.5 15.5523 12.5 15C12.5 14.4477 12.0523 14 11.5 14H9.5Z" fill="white"/>
            </svg>
          ),
          variant: 'secondary'
        }}
        rightButton={{
          label: "Read me",
          onClick: handleReadMe,
          icon: (
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0765 2.53365C8.07781 1.29918 5.5 2.73688 5.5 5.08605V18.914C5.5 21.2632 8.07781 22.7009 10.0765 21.4664L21.2705 14.5524C23.1686 13.3801 23.1686 10.6199 21.2705 9.44763L10.0765 2.53365Z" fill="white"/>
            </svg>
          ),
          variant: 'primary'
        }}
      />
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface SummarySection {
  heading: string
  content: string[]
  isBulleted?: boolean
}

const summaryData: SummarySection[] = [
  {
    heading: "Profile",
    content: [
      "Name: Akshay Borhade",
      "Designation: Associate Director Product Design", 
      "Current Company: OLA"
    ],
    isBulleted: false
  },
  {
    heading: "Background & Experience",
    content: [
      "Currently Associate Director at Ola with experience across consumer platforms, fintech (CoverSure), and parenting platforms (The ParentInc)",
      "Has led teams, scaled design systems, and built products used by millions",
      "Progressed from individual contributor to strategic leader while maintaining hands-on skills"
    ],
    isBulleted: true
  },
  {
    heading: "Key Achievements",
    content: [
      "CoverSure Achievement: Designed Motor Club feature achieving 778% user growth (2.8K to 24.6K users), 99% Day 1 retention, 67% Day 90 retention, 40% MAU increase (5K to 7K), and 280K total session minutes",
      "The ParentInc Achievement: Solved critical Day 0 retention issue where 40%+ users were uninstalling TAP App immediately, successfully improving DAU and retention across Day 1, Day 7, and Day 30 metrics"
    ],
    isBulleted: true
  },
  {
    heading: "Value Proposition for Noon",
    content: [
      "Brings systematic problem-solving approach and ability to build engaging user experiences",
      "Cross-industry experience allows pattern recognition and solution adaptation",
      "Can translate complex business needs into simple, user-friendly interfaces",
      "Excited by e-commerce complexity and direct business impact"
    ],
    isBulleted: true
  },
  {
    heading: "Leadership & Collaboration Style",
    content: [
      "Believes in collaborative, egalitarian approach rather than strict hierarchies",
      "Willing to take direction from younger managers while contributing senior expertise",
      "Emphasizes mutual respect and shared goals over seniority"
    ],
    isBulleted: true
  },
  {
    heading: "Growth Vision (2-3 years)",
    content: [
      "Year 1: Improve platform navigation and build cross-team relationships",
      "Later: Lead major product projects and mentor junior designers",
      "Long-term: Become strategic design leader influencing product direction"
    ],
    isBulleted: true
  },
  {
    heading: "Mentoring & Innovation Approach",
    content: [
      "Teaches through real project involvement rather than separate training",
      "Leverages AI tools to create efficient workflows (Figma to code generation, automated testing)",
      "Focuses on AI that enhances human creativity rather than replacing it"
    ],
    isBulleted: true
  },
  {
    heading: "Career Trajectory",
    content: [
      "Steady growth from basic design tasks to strategic leadership",
      "Transformation projects across multiple industries", 
      "Emphasis on solving increasingly complex problems while maintaining execution excellence"
    ],
    isBulleted: true
  }
]

export default function SummaryPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.push('/')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Akshay's Cover Letter Summary",
          text: "Summary of Akshay's interactive cover letter showcasing technical expertise and experience",
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

  return (
    <div
      className="min-h-screen-safe text-white relative"
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
        <div className="relative flex justify-between items-center px-4 bg-gradient-to-b from-black/20 via-black/20 to-transparent pt-5 pb-8">
          <div className="flex items-center gap-4">
            <div 
              className="p-2 rounded-[40px] inline-flex justify-center items-center cursor-pointer transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90"
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
            <h1 className="text-2xl font-medium text-white">Summary</h1>
          </div>
          <div 
            className="p-2 rounded-[40px] inline-flex justify-start items-center gap-2.5 cursor-pointer transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90"
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
        {summaryData.map((section, index) => (
          <div 
            key={index}
            className={`w-full p-4 rounded-3xl flex flex-col justify-center items-start gap-4 transition-all duration-700 ease-out ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              background: 'linear-gradient(118deg, rgba(235, 235, 235, 0.15) 1.53%, rgba(224, 224, 224, 0.14) 19.05%, rgba(212, 212, 212, 0.11) 40.83%, rgba(207, 207, 207, 0.09) 48.89%, rgba(202, 202, 202, 0.07) 61.66%, rgba(200, 200, 200, 0.06) 81.54%, rgba(196, 196, 196, 0.05) 100%)',
              boxShadow: '0px 1.763px 42.32px -1.763px rgba(0, 0, 0, 0.18)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              transitionDelay: `${index * 150}ms`
            }}
          >
            <div className="self-stretch justify-start text-white/50 text-base leading-tight font-medium">
              {section.heading}
            </div>
            <div className="self-stretch justify-start text-white/90 text-base leading-relaxed font-normal">
              {section.isBulleted ? (
                section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-2 last:mb-0 flex">
                    <span className="mr-2 flex-shrink-0">•</span>
                    <span className="flex-1">{item}</span>
                  </div>
                ))
              ) : (
                section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-2 last:mb-0 w-full">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

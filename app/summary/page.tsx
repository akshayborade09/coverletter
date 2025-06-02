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
    heading: "Who I Am",
    content: [
      "Associate Director Product Design at OLA with hands-on leadership experience juggling strategy while still designing the actual experience people touch. My career spans chaos: ride-sharing madness, AI assistants, insurance nightmares at CoverSure, parenting app drama at The ParentInc. I don't just ship designs - I build prototypes that actually work so developers don't hate me."
    ],
    isBulleted: false
  },
  {
    heading: "Why I'm the Right Fit for Noon",
    content: [
      "I've been living this exact challenge at Ola - juggling strategy while still designing the actual experience people touch",
      "My wins: Turned CoverSure's Motor Club from 2.8K to 24.6K users (778% growth!), saved The ParentInc from their brutal 40% same-day uninstall problem",
      "I only work on products where if users don't trust you, you're dead"
    ],
    isBulleted: true
  },
  {
    heading: "Why Noon Makes Perfect Sense",
    content: [
      "E-commerce is basically my daily life at Ola - millions of people, complex flows, everyone has opinions",
      "If I can make insurance feel simple at CoverSure, I can definitely handle e-commerce complexity",
      "The ParentInc taught me that good design works across cultures (designed for all of Southeast Asia)"
    ],
    isBulleted: true
  },
  {
    heading: "What I Actually Bring",
    content: [
      "I've seen enough patterns to know what works and what's just trendy nonsense",
      "That gut feeling when a user flow is about to make people rage-quit",
      "Built engagement systems that people actually love (not the manipulative kind)",
      "I built AI tools that turn my Figma files into actual code (game changer)"
    ],
    isBulleted: true
  },
  {
    heading: "How I Actually Lead",
    content: [
      "The 22-year-old intern might have the best idea in the room - I've learned to listen",
      "I ask questions before giving answers (learned this the hard way)",
      "My ego took enough beatings early in my career - now I just want to ship great stuff",
      "Younger managers? Bring it on - fresh perspectives keep me sharp"
    ],
    isBulleted: true
  },
  {
    heading: "Why I Want Noon Specifically",
    content: [
      "Every design choice directly hits the bottom line - that connection energizes me",
      "Marketplace complexity is like a puzzle I actually want to solve",
      "Most senior roles turn you into a meeting person - this still lets me design",
      "I want to build something millions of people use and actually love"
    ],
    isBulleted: true
  },
  {
    heading: "Where I See This Going",
    content: [
      "Year 1: Fix the stuff that's obviously broken, earn trust, start moving metrics",
      "Year 2-3: Own the big scary projects, teach the junior folks, help shape where we're heading",
      "Long-term: Be the design person in the room when big business decisions happen"
    ],
    isBulleted: true
  },
  {
    heading: "How I Actually Work",
    content: [
      "Mentoring: Jump into real projects together - no boring classroom stuff",
      "Innovation: I built AI tools that turn my Figma files into actual code (game changer)",
      "Philosophy: Automate the tedious stuff so I can focus on the problems that matter",
      "Growth: I don't climb ladders - I just try to solve more interesting problems each year"
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
    router.back()
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
            className={`self-stretch p-4 rounded-3xl inline-flex flex-col justify-center items-start gap-4 transition-all duration-700 ease-out ${
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
                  <div key={itemIndex} className="mb-2 last:mb-0">
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

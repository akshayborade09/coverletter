"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { TextEffect } from "@/components/motion-primitives/text-effect"

export default function SummaryPage() {
  const router = useRouter()

  const indicTTSRepo = "@https://github.com/AI4Bharat/Indic-TTS"

  const name = `Name: Akshay Borhade`
  const designation = `Designation: Associate Director Product Design`
  const company = `Current Company: OLA`

  const summaryContent = `I currently serve as Associate Director at Ola and bring extensive cross-industry experience spanning consumer platforms, fintech at CoverSure, and parenting platforms at The ParentInc. I have successfully led design teams, scaled design systems, and delivered products used by millions of users while maintaining a balance between strategic leadership and hands-on craft execution. My value proposition centers on my systematic problem-solving approach and ability to simplify complex business requirements into intuitive user interfaces. My cross-industry experience has given me pattern recognition skills that allow me to adapt solutions from one domain to another effectively. I am particularly drawn to Noon because of the direct impact that e-commerce design decisions have on business outcomes and the complex, engaging challenges that the marketplace presents. In terms of my leadership philosophy, I emphasize collaborative, egalitarian working relationships over traditional hierarchies. I express comfort with taking direction from potentially younger managers while contributing my senior expertise, believing that mutual respect and shared goals matter more than seniority levels. My mentoring approach involves real-world, hands-on learning rather than separate training sessions, integrating junior designers into actual project work. I have a clear growth vision for my role at Noon, starting with improving platform navigation and building cross-team relationships in the first year, then progressing to lead major product projects and mentor junior designers, ultimately becoming a strategic design leader who influences product direction. I also demonstrate innovation through AI integration, having developed workflows that convert Figma designs to code and create automated design reviews, focusing on AI that enhances rather than replaces human creativity. My career trajectory shows steady growth from individual contributor to strategic leader across multiple industries, with each role teaching me valuable lessons about regulations, scaling for millions of users, and influencing user behavior through design. This breadth of experience has equipped me with the ability to see connections others might miss and solve increasingly complex problems while maintaining excellence in execution.`

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
        {/* Div 1: Basic Information - Container */}
        <div className="mb-4">
          {/* Name */}
          <div className="mb-1">
            <TextEffect
              per="word"
              preset="fade"
              speedReveal={12}
              className="text-white text-lg leading-8 font-regular whitespace-pre-line"
            >
              {name}
            </TextEffect>
          </div>

          {/* Designation */}
          <div className="mb-1">
            <TextEffect
              per="word"
              preset="fade"
              speedReveal={12}
              className="text-white text-lg leading-8 font-regular whitespace-pre-line"
            >
              {designation}
            </TextEffect>
          </div>

          {/* Company */}
          <div className="mb-1">
            <TextEffect
              per="word"
              preset="fade"
              speedReveal={12}
              className="text-white text-lg leading-8 font-regular whitespace-pre-line"
            >
              {company}
            </TextEffect>
          </div>
        </div>

        {/* Div 2: Professional Summary */}
        <div>
          <TextEffect
            per="word"
            preset="fade"
            speedReveal={12}
            className="text-white/80 text-lg leading-8 font-light whitespace-pre-line"
          >
            {summaryContent}
          </TextEffect>
        </div>
      </div>
    </div>
  )
}

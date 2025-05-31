"use client"

import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import BottomNavigation from "@/components/BottomNavigation"
import { questionsData } from "@/components/QuestionsData"

export default function ReadingPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const router = useRouter()

  // Simple timing - each paragraph gets equal time based on word count
  const getAllParagraphs = () => {
    const paragraphs: Array<{
      text: string
      type: 'question' | 'answer'
      questionIndex: number
    }> = []

    questionsData.forEach((item, questionIndex) => {
      // Add question
      paragraphs.push({
        text: item.question,
        type: 'question',
        questionIndex
      })

      // Split answer into paragraphs
      const answerParagraphs = item.answer
        .split('. ')
        .map((paragraph, index, array) => {
          return index < array.length - 1 ? paragraph + '.' : paragraph
        })
        .filter(paragraph => paragraph.trim().length > 0)

      // Add each answer paragraph
      answerParagraphs.forEach(paragraph => {
        paragraphs.push({
          text: paragraph,
          type: 'answer',
          questionIndex
        })
      })
    })

    return paragraphs
  }

  const allParagraphs = getAllParagraphs()

  // Simple timing calculation
  const getParagraphTiming = (paragraphIndex: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return { start: 0, end: 0 }

    const totalDuration = audio.duration
    const paragraphDuration = totalDuration / allParagraphs.length
    
    return {
      start: paragraphIndex * paragraphDuration,
      end: (paragraphIndex + 1) * paragraphDuration
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    router.back()
  }

  const handleSummarise = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    router.push("/summary")
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => setIsPlaying(false)
      const handlePause = () => setIsPlaying(false)
      const handlePlay = () => setIsPlaying(true)
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)

      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('timeupdate', handleTimeUpdate)

      return () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [])

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
            Read me
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-32 space-y-12">
        {questionsData.map((item, index) => {
          // Get paragraph indices for this question/answer pair
          let paragraphIndex = 0
          for (let i = 0; i < index; i++) {
            paragraphIndex += 1 // question
            const prevAnswerParagraphs = questionsData[i].answer.split('. ').filter(p => p.trim().length > 0)
            paragraphIndex += prevAnswerParagraphs.length
          }

          const questionTiming = getParagraphTiming(paragraphIndex)
          const isQuestionActive = currentTime >= questionTiming.start && currentTime <= questionTiming.end
          const isQuestionSpoken = currentTime > questionTiming.end

          // Split current answer into paragraphs
          const answerParagraphs = item.answer
            .split('. ')
            .map((paragraph, paragIndex, array) => {
              return paragIndex < array.length - 1 ? paragraph + '.' : paragraph
            })
            .filter(paragraph => paragraph.trim().length > 0)

          return (
            <div 
              key={`qa-${index}`} 
              className="space-y-6"
            >
              <div 
                className="text-gray-400 text-base leading-relaxed"
              >
                {item.question}
              </div>
              
              <div className="space-y-4">
                {answerParagraphs.map((paragraph, paragraphIdx) => {
                  return (
                    <div 
                      key={`answer-${index}-${paragraphIdx}`}
                      className="text-white text-2xl leading-relaxed font-normal"
                    >
                      {paragraph}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        className="hidden"
      >
        <source src="/audio/Read-out.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Bottom Navigation with Summarise and Pause/Play */}
      <BottomNavigation
        leftButton={{
          label: "Summarise",
          onClick: handleSummarise,
          icon: (
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 5C4.5 3.34315 5.84315 2 7.5 2H17.5C19.1569 2 20.5 3.34315 20.5 5V19C20.5 20.6569 19.1569 22 17.5 22H7.5C5.34315 22 4.5 20.6569 4.5 19V5ZM9.5 6C8.94772 6 8.5 6.44772 8.5 7C8.5 7.55228 8.94772 8 9.5 8H15.5C16.0523 8 16.5 7.55228 16.5 7C16.5 6.44772 16.0523 6 15.5 6H9.5ZM9.5 10C8.94772 10 8.5 10.4477 8.5 11C8.5 11.5523 8.94772 12 9.5 12H15.5C16.0523 12 16.5 11.5523 16.5 11C16.5 10.4477 16.0523 10 15.5 10H9.5ZM9.5 14C8.94772 14 8.5 14.4477 8.5 15C8.5 15.5523 8.94772 16 9.5 16H11.5C12.0523 16 12.5 15.5523 12.5 15C12.5 14.4477 12.0523 14 11.5 14H9.5Z" fill="white"/>
            </svg>
          ),
          variant: 'secondary'
        }}
        rightButton={{
          label: isPlaying ? "Pause" : "Play",
          onClick: togglePlayPause,
          icon: isPlaying ? (
            <div className="w-6 h-6 relative overflow-hidden flex items-center justify-center">
              <div className="w-1 h-4 bg-white rounded-sm"></div>
              <div className="w-1 h-4 bg-white rounded-sm ml-1"></div>
            </div>
          ) : (
            <svg 
              width="25" 
              height="24" 
              viewBox="0 0 25 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.0765 2.53365C8.07781 1.29918 5.5 2.73688 5.5 5.08605V18.914C5.5 21.2632 8.07781 22.7009 10.0765 21.4664L21.2705 14.5524C23.1686 13.3801 23.1686 10.6199 21.2705 9.44763L10.0765 2.53365Z" fill="white"/>
            </svg>
          ),
          variant: 'primary'
        }}
      />
    </div>
  )
}

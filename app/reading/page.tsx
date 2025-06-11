"use client"

import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import BottomNavigation from "@/components/BottomNavigation"
import { questionsData } from "@/components/QuestionsData"

export default function ReadingPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)
  const [hasReachedLastSection, setHasReachedLastSection] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [userInteracted, setUserInteracted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [savedPosition, setSavedPosition] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Filter questions (same filter used in the JSX)
  const filteredQuestions = questionsData.filter(question => 
    question.question !== "Why My Background Fits Noon Perfectly" && 
    question.question !== "Why Noon, Not Just Any Senior Role"
  )

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }
    checkMobile()
  }, [])

  // Initialize audio context for mobile
  const initAudioContext = async () => {
    if (!audioContext && isMobile) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
          const ctx = new AudioContextClass()
          setAudioContext(ctx)
          
          // Resume context if suspended (iOS requirement)
          if (ctx.state === 'suspended') {
            await ctx.resume()
          }
        }
      } catch (error) {
        console.error('Audio context creation failed:', error)
      }
    }
  }

  // Toggle playback speed: 1x -> 1.5x -> 2x -> 1x
  const togglePlaybackSpeed = () => {
    const speeds = [1, 1.5, 2]
    const currentIndex = speeds.indexOf(playbackSpeed)
    const nextIndex = (currentIndex + 1) % speeds.length
    const newSpeed = speeds[nextIndex]
    
    setPlaybackSpeed(newSpeed)
    
    // Apply speed to audio element
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  // Create playlist mapping based on filtered questions
  const createPlaylist = () => {
    const playlist: string[] = []
    let audioFileNumber = 1
    
    filteredQuestions.forEach((question, questionIndex) => {
      // Add the question audio file
      playlist.push(`${audioFileNumber.toString().padStart(2, '0')}.mp3`)
      audioFileNumber++
      
      // Add audio files for each bullet point
      question.answer.forEach(() => {
        playlist.push(`${audioFileNumber.toString().padStart(2, '0')}.mp3`)
        audioFileNumber++
      })
    })
    
    return playlist
  }

  const playlist = createPlaylist()

  // Generate unique ID for content items
  const getItemId = (questionIndex: number, bulletIndex: number) => {
    return bulletIndex === -1 ? `q-${questionIndex}` : `q-${questionIndex}-b-${bulletIndex}`
  }

  // Get current playing item info
  const getCurrentItemInfo = () => {
    let questionIndex = 0
    let bulletIndex = -1
    let accumulatedIndex = 0
    
    for (let q = 0; q < filteredQuestions.length; q++) {
      if (currentChapterIndex === accumulatedIndex) {
        questionIndex = q
        bulletIndex = -1 // This is the question itself
        break
      }
      accumulatedIndex++
      
      for (let b = 0; b < filteredQuestions[q].answer.length; b++) {
        if (currentChapterIndex === accumulatedIndex) {
          questionIndex = q
          bulletIndex = b
          break
        }
        accumulatedIndex++
      }
      if (bulletIndex !== -1) break
    }
    
    return { questionIndex, bulletIndex }
  }

  // Auto-scroll functionality
  const scrollToCurrentItem = (questionIndex: number, bulletIndex: number) => {
    const contentContainer = contentRef.current
    if (!contentContainer) return

    // Find the currently highlighted element
    let targetElement: HTMLElement | null = null
    
    if (bulletIndex === -1) {
      // Highlighting a question
      targetElement = contentContainer.querySelector(`[data-question-index="${questionIndex}"]`)
    } else {
      // Highlighting a bullet
      targetElement = contentContainer.querySelector(`[data-question-index="${questionIndex}"][data-bullet-index="${bulletIndex}"]`)
    }

    if (!targetElement) return

    // Check if we're on the last question
    const isLastQuestion = questionIndex === filteredQuestions.length - 1
    
    if (isLastQuestion && !hasReachedLastSection) {
      // Get the last element in the content
      const lastQuestion = contentContainer.querySelector(`[data-question-index="${filteredQuestions.length - 1}"]`)
      const lastBulletCount = filteredQuestions[filteredQuestions.length - 1].answer.length - 1
      const lastBullet = contentContainer.querySelector(`[data-question-index="${filteredQuestions.length - 1}"][data-bullet-index="${lastBulletCount}"]`)
      const lastElement = lastBullet || lastQuestion
      
      if (lastElement) {
        const windowHeight = window.innerHeight
        const lastElementRect = lastElement.getBoundingClientRect()
        
        // If the last element is visible in the viewport, stop auto-scrolling
        if (lastElementRect.bottom <= windowHeight - 150) { // 150px buffer for bottom navigation
          setHasReachedLastSection(true)
          return
        }
      }
    }

    // Only auto-scroll if we haven't reached the last section
    if (!hasReachedLastSection) {
      const windowHeight = window.innerHeight
      const targetRect = targetElement.getBoundingClientRect()
      
      // Calculate the center position of the viewport
      const centerPosition = windowHeight / 2
      const targetCenter = targetRect.top + targetRect.height / 2
      
      // Calculate how much to scroll to center the element
      const scrollOffset = targetCenter - centerPosition
      
      if (Math.abs(scrollOffset) > 10) { // Only scroll if needed
        window.scrollBy({
          top: scrollOffset,
          behavior: 'smooth'
        })
      }
    }
  }

  // Effect to handle auto-scroll when current item changes
  useEffect(() => {
    const { questionIndex, bulletIndex } = getCurrentItemInfo()
    scrollToCurrentItem(questionIndex, bulletIndex)
  }, [currentChapterIndex, hasReachedLastSection])

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const playNextChapter = () => {
    // Mark current item as completed before moving to next
    const { questionIndex, bulletIndex } = getCurrentItemInfo()
    const currentItemId = getItemId(questionIndex, bulletIndex)
    setCompletedItems(prev => new Set([...prev, currentItemId]))
    
    // Reset saved position when moving to next chapter
    setSavedPosition(0)
    
    if (currentChapterIndex < playlist.length - 1) {
      setShouldAutoPlay(isPlaying) // Remember if we should auto-play
      setCurrentChapterIndex(currentChapterIndex + 1)
    } else {
      // Reached the end, pause and mark as completed
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
      setShouldAutoPlay(false)
      setIsCompleted(true)
    }
  }

  const handleRestart = () => {
    // Reset all states including saved position
    setCurrentChapterIndex(0)
    setIsCompleted(false)
    setHasReachedLastSection(false)
    setCompletedItems(new Set())
    setSavedPosition(0)
    setShouldAutoPlay(true)
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Start playing after a short delay to ensure everything is reset
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Auto-play failed on restart:', error)
          setShouldAutoPlay(false)
        })
      }
    }, 500)
  }

  const togglePlayPause = async () => {
    // Mark user interaction for autoplay policies
    if (!userInteracted) {
      setUserInteracted(true)
      
      // Initialize audio context for mobile on first interaction
      if (isMobile) {
        await initAudioContext()
      }
    }

    if (isCompleted) {
      handleRestart()
      return
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        // Save current playback position before pausing
        setSavedPosition(audioRef.current.currentTime)
        audioRef.current.pause()
        setShouldAutoPlay(false)
      } else {
        // Clear any previous errors
        setAudioError(null)
        
        // Check if audio source exists
        const audio = audioRef.current
        
        // Mobile-specific: Ensure audio context is running
        if (isMobile && audioContext) {
          if (audioContext.state === 'suspended') {
            try {
              await audioContext.resume()
            } catch (error) {
              console.error('Failed to resume audio context:', error)
            }
          }
        }
        
        // Load the audio if not already loaded
        const attemptPlayWithPosition = async () => {
          try {
            // Set the saved position before playing
            if (savedPosition > 0) {
              audio.currentTime = savedPosition
            }
            
            const playPromise = audio.play()
            if (playPromise !== undefined) {
              await playPromise
              setShouldAutoPlay(true)
              setIsPlaying(true)
            }
          } catch (error) {
            console.error('Audio play failed:', error)
            const audioError = error as Error
            console.error('Audio error:', audioError)
            
            // Mobile-specific error handling
            if (isMobile) {
              if (audioError.name === 'NotAllowedError') {
                setAudioError('Mobile browser blocked audio. Please ensure sound is enabled and try again.')
              } else if (audioError.name === 'NotSupportedError') {
                setAudioError('Audio format not supported on this mobile device.')
              } else {
                setAudioError('Mobile audio playback failed. Try refreshing the page.')
              }
            } else {
              setAudioError(`Playback failed: ${audioError.message}`)
            }
            
            // Try alternative approach with longer delay for mobile
            const retryDelay = isMobile ? 2000 : 1000
            setTimeout(async () => {
              audio.load()
              
              setTimeout(async () => {
                try {
                  if (savedPosition > 0) {
                    audio.currentTime = savedPosition
                  }
                  await audio.play()
                  setShouldAutoPlay(true)
                  setIsPlaying(true)
                  setAudioError(null)
                } catch (retryError) {
                  const typedRetryError = retryError as Error
                  console.error('Retry failed:', typedRetryError)
                  setAudioError(`Unable to play audio on this device. Try using headphones or checking volume settings.`)
                }
              }, isMobile ? 300 : 100)
            }, retryDelay)
          }
        }
        
        // Check if audio is loaded enough to set currentTime
        if (audio.readyState >= 1) { // HAVE_METADATA or higher
          attemptPlayWithPosition()
        } else {
          // Wait for metadata to load first
          const handleLoadedMetadata = () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            attemptPlayWithPosition()
          }
          audio.addEventListener('loadedmetadata', handleLoadedMetadata)
          
          // Force load if not already loading
          if (audio.readyState === 0) {
            audio.load()
          }
          
          // Fallback timeout
          setTimeout(() => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            attemptPlayWithPosition()
          }, isMobile ? 2000 : 1000)
        }
      }
    }
  }

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setShouldAutoPlay(false)
    setHasReachedLastSection(false)
    setIsCompleted(false)
    setCompletedItems(new Set())
    router.back()
  }

  const handleSummarise = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setShouldAutoPlay(false)
    setHasReachedLastSection(false)
    setIsCompleted(false)
    setCompletedItems(new Set())
    router.push("/summary")
  }

  // Main effect for audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => {
        playNextChapter()
      }
      const handlePause = () => {
        if (!shouldAutoPlay) {
          setIsPlaying(false)
        }
      }
      const handlePlay = () => {
        setIsPlaying(true)
      }
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
      
      // Additional mobile-specific events
      const handleCanPlay = () => {
        setAudioError(null)
      }
      
      const handleWaiting = () => {
        // No additional action needed
      }
      
      const handleStalled = () => {
        // No additional action needed
      }

      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('waiting', handleWaiting)
      audio.addEventListener('stalled', handleStalled)

      return () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('waiting', handleWaiting)
        audio.removeEventListener('stalled', handleStalled)
      }
    }
  }, [currentChapterIndex, isPlaying, shouldAutoPlay])

  // Effect to handle chapter transitions and auto-play
  useEffect(() => {
    const audio = audioRef.current
    if (audio && shouldAutoPlay && userInteracted) {
      // Better loading and error handling for production
      const attemptPlay = () => {
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
          audio.play()
            .then(() => {
              setIsPlaying(true)
            })
            .catch(error => {
              console.error('Auto-play failed:', error)
              
              // For mobile, try with cache-busting URL
              if (isMobile) {
                const cacheBustUrl = `/audio/${playlist[currentChapterIndex]}?auto=${Date.now()}`
                audio.src = cacheBustUrl
                audio.load()
                
                setTimeout(() => {
                  audio.play()
                    .then(() => {
                      setIsPlaying(true)
                    })
                    .catch(() => {
                      setShouldAutoPlay(false)
                      setIsPlaying(false)
                    })
                }, 1500)
              } else {
                // Don't retry auto-play on desktop, let user manually control
                setShouldAutoPlay(false)
                setIsPlaying(false)
              }
            })
        } else if (audio.readyState === 0) {
          // Audio hasn't started loading yet
          setTimeout(attemptPlay, isMobile ? 800 : 300)
        } else {
          // Wait a bit more for the audio to load
          setTimeout(attemptPlay, isMobile ? 600 : 200)
        }
      }
      
      // Add error event listener for auto-play
      const handleAutoPlayError = (e: Event) => {
        console.error('Auto-play audio loading error:', e)
        
        // For mobile, try reloading the audio with a fresh request
        if (isMobile && audio) {
          setTimeout(() => {
            const newSrc = `/audio/${playlist[currentChapterIndex]}?recover=${Date.now()}`
            audio.src = newSrc
            audio.load()
            setTimeout(attemptPlay, 1500)
          }, 500)
        } else {
          setShouldAutoPlay(false)
          setIsPlaying(false)
        }
      }
      
      audio.addEventListener('error', handleAutoPlayError)
      
      // Start attempting to play after a longer delay to allow source loading
      const initialDelay = isMobile ? 1200 : 500
      const timer = setTimeout(attemptPlay, initialDelay)
      
      return () => {
        clearTimeout(timer)
        audio.removeEventListener('error', handleAutoPlayError)
      }
    }
  }, [currentChapterIndex, shouldAutoPlay, userInteracted, isMobile])

  // Effect to update audio source when chapter changes
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const newSrc = `/audio/${playlist[currentChapterIndex]}`
      
      // Update the audio source
      audio.src = newSrc
      audio.load()
      
      // Apply current playback speed
      audio.playbackRate = playbackSpeed
      
      // Reset saved position when changing chapters
      setSavedPosition(0)
    }
  }, [currentChapterIndex])

  // Effect to update playback speed without reloading audio
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  const { questionIndex, bulletIndex } = getCurrentItemInfo()

  // Get color class for content items
  const getQuestionColorClass = (index: number) => {
    const itemId = getItemId(index, -1)
    const isCompleted = completedItems.has(itemId)
    const isCurrent = questionIndex === index && bulletIndex === -1
    
    if (isCompleted) return 'text-white'
    if (isCurrent) return 'text-green-400'
    return 'text-white/30'
  }

  const getBulletColorClass = (qIndex: number, bIndex: number) => {
    const itemId = getItemId(qIndex, bIndex)
    const isCompleted = completedItems.has(itemId)
    const isCurrent = questionIndex === qIndex && bulletIndex === bIndex
    
    if (isCompleted) return 'text-white'
    if (isCurrent) return 'text-green-400'
    return 'text-white/30'
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
        <div className="relative flex items-center px-4 bg-gradient-to-b from-black/40 via-black/20 to-transparent pt-5 pb-8 gap-4">
          <div 
            className="p-2 rounded-[40px] inline-flex justify-center items-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90"
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
      <div ref={contentRef} className="px-4 pb-32 space-y-8">
        {/* Audio Error Message */}
        {audioError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
            <div className="text-red-200 text-sm mb-2">Audio Loading Error</div>
            <div className="text-white text-sm">{audioError}</div>
            <div className="text-red-200 text-xs mt-2">
              Try refreshing the page or check your internet connection.
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => {
                  const testUrl = `${window.location.origin}/audio/${playlist[currentChapterIndex]}`
                  
                  fetch(testUrl, { method: 'HEAD' })
                    .then(response => {
                      if (response.ok) {
                        setAudioError(null)
                      } else {
                        setAudioError(`Audio file not found (${response.status})`)
                      }
                    })
                    .catch(error => {
                      setAudioError('Network error - cannot reach audio files')
                    })
                }}
                className="px-3 py-1 bg-red-500/30 text-white text-xs rounded"
              >
                Test Audio
              </button>
              <button 
                onClick={() => {
                  setAudioError(null)
                  
                  if (audioRef.current) {
                    const audio = audioRef.current
                    // Use cache-busting URL
                    const cacheBustUrl = `/audio/${playlist[currentChapterIndex]}?retry=${Date.now()}`
                    
                    audio.src = cacheBustUrl
                    audio.load()
                    
                    setTimeout(() => {
                      audio.play()
                        .then(() => {
                        })
                        .catch(retryError => {
                          const typedError = retryError as Error
                          setAudioError('Manual retry failed. Try using headphones or checking device volume.')
                        })
                    }, 500)
                  }
                }}
                className="px-3 py-1 bg-orange-500/30 text-white text-xs rounded"
              >
                Force Retry
              </button>
            </div>
          </div>
        )}
        
        {filteredQuestions.map((item, index) => (
            <div 
              key={`qa-${index}`} 
            className={`space-y-4 transition-all duration-700 ease-out ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${index * 150}ms`
            }}
            >
              <div 
              data-question-index={index}
              className={`text-2xl leading-tight font-normal transition-colors ${getQuestionColorClass(index)}`}
              >
                {item.question}
              </div>
              
            <div className="text-white/90 text-2xl leading-relaxed font-light">
              {item.answer.map((bulletPoint, bulletIdx) => (
                <div 
                  key={bulletIdx} 
                  data-question-index={index}
                  data-bullet-index={bulletIdx}
                  className={`mb-2 last:mb-0 flex transition-colors ${getBulletColorClass(index, bulletIdx)}`}
                >
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span className="flex-1">{bulletPoint}</span>
                    </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="none"
        className="hidden"
        playsInline
        webkit-playsinline="true"
        controls={false}
      >
        <source src={`/audio/${playlist[currentChapterIndex]}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Bottom Navigation with Summarise, Speed, and Pause/Play */}
      <div className="fixed left-0 right-0 bottom-0 h-36 pointer-events-none z-10">
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            maskImage: 'linear-gradient(0deg, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(0deg, black 0%, black 70%, transparent 100%)'
          }}
        ></div>
      </div>

      <div className="fixed left-4 right-4 z-20"
        style={{
          position: 'fixed',
          bottom: `calc(1rem + env(safe-area-inset-bottom, 0px))`,
          left: '1rem',
          right: '1rem',
          zIndex: 20,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        }}
      >
        <div className="w-full p-2 rounded-[991.36px] inline-flex justify-start items-center gap-1.5 overflow-hidden"
          style={{
            background: 'linear-gradient(118deg, rgba(255, 255, 255, 0.50) -19.85%, rgba(235, 235, 235, 0.37) 4.2%, rgba(224, 224, 224, 0.29) 13.88%, rgba(212, 212, 212, 0.21) 27.98%, rgba(207, 207, 207, 0.18) 37.8%, rgba(202, 202, 202, 0.14) 44.38%, rgba(200, 200, 200, 0.13) 50.54%, rgba(196, 196, 196, 0.10) 60.21%)',
            boxShadow: '0px 1.983px 47.585px -1.983px rgba(0, 0, 0, 0.18)',
            backdropFilter: 'blur(23.792530059814453px)',
            WebkitBackdropFilter: 'blur(23.792530059814453px)'
          }}
        >
          {/* Summarise Button */}
          <button
            onClick={handleSummarise}
            className="flex-1 p-3 rounded-3xl flex justify-center items-center gap-1.5 transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90 bg-white/30"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 5C4.5 3.34315 5.84315 2 7.5 2H17.5C19.1569 2 20.5 3.34315 20.5 5V19C20.5 20.6569 19.1569 22 17.5 22H7.5C5.34315 22 4.5 20.6569 4.5 19V5ZM9.5 6C8.94772 6 8.5 6.44772 8.5 7C8.5 7.55228 8.94772 8 9.5 8H15.5C16.0523 8 16.5 7.55228 16.5 7C16.5 6.44772 16.0523 6 15.5 6H9.5ZM9.5 10C8.94772 10 8.5 10.4477 8.5 11C8.5 11.5523 8.94772 12 9.5 12H15.5C16.0523 12 16.5 11.5523 16.5 11C16.5 10.4477 16.0523 10 15.5 10H9.5ZM9.5 14C8.94772 14 8.5 14.4477 8.5 15C8.5 15.5523 8.94772 16 9.5 16H11.5C12.0523 16 12.5 15.5523 12.5 15C12.5 14.4477 12.0523 14 11.5 14H9.5Z" fill="white"/>
            </svg>
            <div className="text-center justify-center text-white text-base leading-snug">
              Summarise
            </div>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="flex-1 p-3 rounded-[63.49px] flex justify-center items-center gap-1.5 transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90"
            style={{ backgroundColor: "#00D128" }}
          >
            {isCompleted ? (
              <svg 
                width="25" 
                height="24" 
                viewBox="0 0 25 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 12C4.5 7.58172 8.08172 4 12.5 4C16.9183 4 20.5 7.58172 20.5 12C20.5 16.4183 16.9183 20 12.5 20C10.7817 20 9.21373 19.4151 7.96087 18.4295" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8.5 16L6.5 18L4.5 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : isPlaying ? (
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
            )}
            <div className="text-center justify-center text-white text-base leading-snug">
              {isCompleted ? "Restart" : (isPlaying ? "Pause" : "Play")}
            </div>
          </button>

          {/* Speed Toggle Button - Only appears after user taps play */}
          {userInteracted && (
            <button
              onClick={togglePlaybackSpeed}
              className="p-3 rounded-full flex justify-center items-center transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90 bg-white/30"
              style={{ minWidth: '56px' }}
            >
              <span className="text-white text-sm font-medium">
                {playbackSpeed === 1 ? '1x' : playbackSpeed === 1.5 ? '1.5x' : '2x'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}



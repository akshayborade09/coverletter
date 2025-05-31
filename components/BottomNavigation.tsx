"use client"

import { useState, useEffect } from 'react'

interface ButtonConfig {
  label: string
  onClick: () => void
  icon: React.ReactNode
  variant?: 'secondary' | 'primary'
}

interface BottomNavigationProps {
  leftButton: ButtonConfig
  rightButton: ButtonConfig
}

export default function BottomNavigation({ leftButton, rightButton }: BottomNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    let lastScrollY = 0

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false
        return
      }

      // Consider "scrolled" when user has scrolled down more than 100px
      setIsScrolled(scrollY > 100)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Bottom Smooth Fade Mask - Enhanced mobile compatibility */}
      <div 
        className="fixed left-0 right-0 bottom-0 h-36 pointer-events-none z-10"
        style={{
          height: 'min(144px, 20dvh)',
          position: 'fixed',
          bottom: '0px',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          transform: 'translateZ(0)', // Force hardware acceleration
          WebkitTransform: 'translateZ(0)'
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            maskImage: 'linear-gradient(0deg, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(0deg, black 0%, black 70%, transparent 100%)'
          }}
        ></div>
      </div>

      {/* Bottom Navigation - Enhanced mobile compatibility with scroll detection */}
      <div 
        className="fixed left-4 right-4 z-20 transition-all duration-300 ease-out"
        style={{
          position: 'fixed',
          bottom: `calc(${isScrolled ? '0.5rem' : '1rem'} + env(safe-area-inset-bottom, 0px))`,
          left: '1rem',
          right: '1rem',
          zIndex: 20,
          transform: 'translateZ(0)', // Force hardware acceleration
          WebkitTransform: 'translateZ(0)'
        }}
      >
        <div 
          className="w-full p-2 rounded-[991.36px] inline-flex justify-start items-center gap-1.5 overflow-hidden"
          style={{
            background: 'linear-gradient(118deg, rgba(255, 255, 255, 0.50) -19.85%, rgba(235, 235, 235, 0.37) 4.2%, rgba(224, 224, 224, 0.29) 13.88%, rgba(212, 212, 212, 0.21) 27.98%, rgba(207, 207, 207, 0.18) 37.8%, rgba(202, 202, 202, 0.14) 44.38%, rgba(200, 200, 200, 0.13) 50.54%, rgba(196, 196, 196, 0.10) 60.21%)',
            boxShadow: '0px 1.983px 47.585px -1.983px rgba(0, 0, 0, 0.18)',
            backdropFilter: 'blur(23.792530059814453px)',
            WebkitBackdropFilter: 'blur(23.792530059814453px)'
          }}
        >
          <button
            onClick={leftButton.onClick}
            className={`flex-1 p-3 rounded-3xl flex justify-center items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 ${
              leftButton.variant === 'primary' ? '' : 'bg-white/30'
            }`}
            style={leftButton.variant === 'primary' ? { backgroundColor: "#00D128" } : {}}
          >
            {leftButton.icon}
            <div className="text-center justify-center text-white text-base leading-snug">
              {leftButton.label}
            </div>
          </button>
          <button
            onClick={rightButton.onClick}
            className={`flex-1 p-3 rounded-[63.49px] flex justify-center items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 ${
              rightButton.variant === 'primary' ? '' : 'bg-white/30'
            }`}
            style={rightButton.variant === 'primary' ? { backgroundColor: "#00D128" } : {}}
          >
            {rightButton.icon}
            <div className="text-center justify-center text-white text-base leading-snug">
              {rightButton.label}
            </div>
          </button>
        </div>
      </div>
    </>
  )
} 
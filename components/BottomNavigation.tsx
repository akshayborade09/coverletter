"use client"

import { motion } from "framer-motion"

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
  return (
    <>
      {/* Bottom Smooth Fade Mask */}
      <div className="fixed bottom-0 left-0 right-0 h-36 pointer-events-none z-30">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            maskImage: 'linear-gradient(0deg, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(0deg, black 0%, black 70%, transparent 100%)'
          }}
        ></div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-7 left-4 right-4 z-40">
        <motion.div 
          className="w-full p-2 rounded-[991.36px] inline-flex justify-start items-center gap-1.5 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          style={{
            background: 'linear-gradient(118deg, rgba(255, 255, 255, 0.50) -19.85%, rgba(235, 235, 235, 0.37) 4.2%, rgba(224, 224, 224, 0.29) 13.88%, rgba(212, 212, 212, 0.21) 27.98%, rgba(207, 207, 207, 0.18) 37.8%, rgba(202, 202, 202, 0.14) 44.38%, rgba(200, 200, 200, 0.13) 50.54%, rgba(196, 196, 196, 0.10) 60.21%)',
            boxShadow: '0px 1.983px 47.585px -1.983px rgba(0, 0, 0, 0.18)',
            backdropFilter: 'blur(23.792530059814453px)',
            WebkitBackdropFilter: 'blur(23.792530059814453px)'
          }}
        >
          <motion.button
            onClick={leftButton.onClick}
            className={`flex-1 p-3 rounded-3xl flex justify-center items-center gap-1.5 ${
              leftButton.variant === 'primary' ? '' : 'bg-white/30'
            }`}
            style={leftButton.variant === 'primary' ? { backgroundColor: "#00D128" } : {}}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {leftButton.icon}
            <div className="text-center justify-center text-white text-base leading-snug">
              {leftButton.label}
            </div>
          </motion.button>
          <motion.button
            onClick={rightButton.onClick}
            className={`flex-1 p-3 rounded-[63.49px] flex justify-center items-center gap-1.5 ${
              rightButton.variant === 'primary' ? '' : 'bg-white/30'
            }`}
            style={rightButton.variant === 'primary' ? { backgroundColor: "#00D128" } : {}}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {rightButton.icon}
            <div className="text-center justify-center text-white text-base leading-snug">
              {rightButton.label}
            </div>
          </motion.button>
        </motion.div>
      </div>
    </>
  )
} 
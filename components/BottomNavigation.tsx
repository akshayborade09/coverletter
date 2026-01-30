"use client"

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
    <div className="w-full p-2 rounded-[991.36px] flex justify-start items-center gap-1.5 overflow-hidden bg-white/20 backdrop-blur-[24px] shadow-[0px_1.983px_47.585px_-1.983px_rgba(0,0,0,0.18)]">
      <button
        onClick={leftButton.onClick}
        className={`flex-1 p-3 rounded-3xl flex justify-center items-center gap-1.5 transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90 ${
          leftButton.variant === 'primary' ? '' : 'bg-white/30'
        }`}
        style={leftButton.variant === 'primary' ? { backgroundColor: '#00D128' } : {}}
      >
        {leftButton.icon}
        <span className="text-center text-white text-base leading-snug">
          {leftButton.label}
        </span>
      </button>
      <button
        onClick={rightButton.onClick}
        className={`flex-1 p-3 rounded-[63.49px] flex justify-center items-center gap-1.5 transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:brightness-110 active:brightness-90 ${
          rightButton.variant === 'primary' ? '' : 'bg-white/30'
        }`}
        style={rightButton.variant === 'primary' ? { backgroundColor: '#00D128' } : {}}
      >
        {rightButton.icon}
        <span className="text-center text-white text-base leading-snug">
          {rightButton.label}
        </span>
      </button>
    </div>
  )
}

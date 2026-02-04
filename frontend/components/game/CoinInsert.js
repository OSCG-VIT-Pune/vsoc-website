'use client'

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useRouter } from 'next/navigation'
import ArcadeCabinet from './ArcadeCabinet'

const CoinInsert = forwardRef((props, ref) => {
  const [coinInserted, setCoinInserted] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [animatingCoin, setAnimatingCoin] = useState(false)
  const router = useRouter()

  useImperativeHandle(ref, () => ({
    insertCoin: () => {
      console.log('CoinInsert: Imperative handle called')
      insertCoin()
    }
  }))

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !coinInserted) {
        insertCoin()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [coinInserted])

  const handleAnimationComplete = () => {
    console.log('Animation complete triggered')
    setCoinInserted(true)
    setAnimatingCoin(false)
    
    // Show buttons after coin lands
    setTimeout(() => {
      setShowButtons(true)
    }, 300)
  }

  const insertCoin = () => {
    console.log('insertCoin internal triggered', { animatingCoin, coinInserted })
    if (animatingCoin || coinInserted) return
    setAnimatingCoin(true)
    // Animation completion handled by callback
  }

  const handleMentorSignup = () => {
    router.push('/mentor-signup')
  }

  const handleStudentSignup = () => {
    router.push('/student-signup')
  }

  return (
    <div className="my-4 w-full flex flex-col items-center justify-center">
      {/* 3D Arcade Cabinet & Slot */}
      <div className={`transition-all duration-1000 ${coinInserted ? 'scale-75 opacity-50' : 'scale-100'}`}>
        <ArcadeCabinet 
          inserting={animatingCoin} 
          onAnimationComplete={handleAnimationComplete}
          onClick={insertCoin}
        />
      </div>

      {/* Press Enter Prompt */}
      {!coinInserted && (
        <div className="text-center mt-8 cursor-default">
          <div className="font-pixel text-lg md:text-xl text-yellow-400/80 animate-blink pixel-text">
            PRESS ENTER TO START
          </div>
        </div>
      )}

      {/* Signup Buttons */}
      {coinInserted && (
        <div className={`text-center w-full mt-4 sm:mt-8 ${showButtons ? 'animate-slide-down' : 'opacity-0'}`}>
          <div className="font-pixel text-xl sm:text-3xl text-cyan-400 mb-8 sm:mb-12 pixel-text animate-pulse-glow">
            SELECT PLAYER TYPE
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center px-4">
            {/* Mentor Button */}
            <button
              onClick={handleMentorSignup}
              className="group relative w-full sm:w-64 px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-r from-cyan-600 to-cyan-800 font-pixel text-base sm:text-lg rounded-none border-4 border-cyan-400 arcade-btn hover:border-cyan-300 hover:from-cyan-500 hover:to-cyan-700 transition-all duration-300 animate-pixel-pop"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex flex-col items-center gap-2 sm:gap-4">
                <div className="text-4xl sm:text-5xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">👨‍🏫</div>
                <div className="text-cyan-300 text-lg sm:text-xl">MENTOR</div>
                <div className="text-[10px] sm:text-xs text-cyan-100 font-sans opacity-80">Guide & Maintain Projects</div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 border-4 border-cyan-300 rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-arcade-pulse"></div>
            </button>

            {/* Student Button */}
            <button
              onClick={handleStudentSignup}
              className="group relative w-full sm:w-64 px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-r from-magenta-600 to-magenta-800 font-pixel text-base sm:text-lg rounded-none border-4 border-magenta-400 arcade-btn hover:border-magenta-300 hover:from-magenta-500 hover:to-magenta-700 transition-all duration-300 animate-pixel-pop"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex flex-col items-center gap-2 sm:gap-4">
                <div className="text-4xl sm:text-5xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">🎓</div>
                <div className="text-magenta-300 text-lg sm:text-xl">STUDENT</div>
                <div className="text-[10px] sm:text-xs text-magenta-100 font-sans opacity-80">Learn & Contribute</div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 border-4 border-magenta-300 rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-arcade-pulse"></div>
            </button>
          </div>

          {/* Hint Text */}
          <div className="mt-12 font-pixel text-sm text-gray-500 animate-pulse">
            CHOOSE YOUR PATH TO START THE GAME
          </div>
        </div>
      )}
    </div>
  )
})

CoinInsert.displayName = 'CoinInsert'

export default CoinInsert

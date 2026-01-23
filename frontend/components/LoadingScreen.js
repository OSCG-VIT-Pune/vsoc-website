'use client'

import React, { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState('boot') // boot, done
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 1. VISUAL: Trigger progress bar animation
    const animationTimer = setTimeout(() => {
      setProgress(100)
    }, 50)

    // 2. LOGIC: Force completion after duration + buffer
    // Duration matches CSS transition (1500ms) + 500ms pause
    const completionTimer = setTimeout(() => {
      setStage('done')
      setTimeout(onComplete, 0)
    }, 2000)

    return () => {
      clearTimeout(animationTimer)
      clearTimeout(completionTimer)
    }
  }, [onComplete])

  if (stage === 'done') return null

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-pixel text-green-400 overflow-hidden">
      {/* Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
        backgroundSize: '100% 2px, 3px 100%'
      }}></div>

      <div className="w-full max-w-md px-8 text-center">
        <div className="text-xl sm:text-2xl mb-8 animate-pulse">
          STARTING ARCADE MACHINE...
        </div>
        
        {/* Retro Loading Bar */}
        <div className="h-4 border-2 border-green-500 p-1 rounded-none">
          <div 
            className="h-full bg-green-500 ease-linear"
            style={{ 
              width: `${progress}%`,
              transition: 'width 1500ms linear'
            }}
          ></div>
        </div>
        
        <div className="mt-4 flex justify-between text-xs sm:text-sm text-green-600 font-mono">
          <span>MEM CHECK: OK</span>
          {/* We accept that text might jump 0 -> 100 or we can animate it separately if strictly needed, 
              but for reliability we bind it to the same state. 
              Since we set state 0->100 directly, this number will jump. 
              Visual bar animates smoothly via CSS. 
              To fix text, we can use a pure visual counter or just show 100% when done. 
              For "Stuck" prevention, simpler is better. Let's just say "LOADING..." or keep it simple.
              Or, we can perform a separate text animation effect. */}
          <span>{progress === 100 ? '100%' : 'LOADING...'}</span>
        </div>
      </div>
    </div>
  )
}

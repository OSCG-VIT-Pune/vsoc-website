'use client'

import React, { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState('boot') // boot, welcome, done
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Stage 1: Booting up (Progress Bar)
    if (stage === 'boot') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [stage])

  // Watch for completion
  useEffect(() => {
    if (progress >= 100 && stage === 'boot') {
      setStage('done')
      // Slight delay to ensure render cycle completes
      setTimeout(() => {
        onComplete()
      }, 0)
    }
  }, [progress, stage, onComplete])

  if (stage === 'done') return null

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-pixel text-green-400 overflow-hidden">
      {/* Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
        backgroundSize: '100% 2px, 3px 100%'
      }}></div>

      {stage === 'boot' && (
        <div className="w-full max-w-md px-8 text-center">
          <div className="text-xl sm:text-2xl mb-8 animate-pulse">
            STARTING ARCADE MACHINE...
          </div>
          
          {/* Retro Loading Bar */}
          <div className="h-4 border-2 border-green-500 p-1 rounded-none">
            <div 
              className="h-full bg-green-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mt-4 flex justify-between text-xs sm:text-sm text-green-600 font-mono">
            <span>MEM CHECK: OK</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}


    </div>
  )
}

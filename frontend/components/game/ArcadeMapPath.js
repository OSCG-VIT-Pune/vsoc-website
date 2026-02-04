'use client'

import React, { useEffect, useState } from 'react'

export default function ArcadeMapPath({ steps }) {
  const [activeStep, setActiveStep] = useState(0)

  // Auto-advance the active step for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="relative w-full py-10 px-4">
      {/* Mobile Vertical Path */}
      <div className="md:hidden flex flex-col gap-12 relative">
        {/* Connecting Line */}
        <div className="absolute left-6 top-8 bottom-8 w-1 bg-green-900 z-0">
          <div 
            className="w-full bg-green-400 transition-all duration-1000 ease-linear"
            style={{ height: `${(activeStep / steps.length) * 100}%` }}
          ></div>
        </div>

        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex items-start gap-6 group">
            <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xl bg-black transition-all duration-300 ${
              idx <= activeStep ? 'border-green-400 text-green-400 scale-110 shadow-[0_0_15px_rgba(74,222,128,0.5)]' : 'border-gray-700 text-gray-700'
            }`}>
              {step.icon}
            </div>
            <div className={`flex-1 p-4 border-2 transition-all duration-300 ${
              idx <= activeStep ? 'border-green-400 bg-green-900/10' : 'border-gray-800 bg-black'
            }`}>
              <div className="font-pixel text-green-400 mb-1">STEP {step.step}</div>
              <h3 className="text-white font-bold mb-1">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Horizontal Wavy Path */}
      <div className="hidden md:block relative h-96 w-full">
        {/* SVG Path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          overflow="visible"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          
          {/* Background Path */}
          <path 
            d="M 50 150 C 200 150, 200 50, 350 50 C 500 50, 500 250, 650 250 C 800 250, 800 150, 950 150"
            fill="none"
            stroke="#064e3b"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />

          {/* Animated Active Path (Masked or Partial) */}
          {/* Simulating progress path for simplicity in static SVG is hard without exact lengths, 
              so we'll rely on the nodes lighting up for visual flow */}
        </svg>

        {/* Nodes positioned absolutely along the theoretical curve */}
        {/* Coordinates roughly matching the bezier control points above */}
        {/* 
           0% -> (50, 150)
           25% -> (350, 50)
           50% -> (650, 250)
           75% -> (950, 150)
           
           We have 5 steps, so we need 5 points.
           Let's distribute them:
           1: 5%, 2: 27%, 3: 50%, 4: 73%, 5: 95%
        */}

        {steps.map((step, idx) => {
           // Hardcoded positions for the wave
           const positions = [
             { top: '150px', left: '5%' },
             { top: '50px', left: '27%' },
             { top: '150px', left: '50%' }, // Middle point
             { top: '250px', left: '73%' },
             { top: '150px', left: '95%' }
           ]
           const pos = positions[idx] || { top: '0', left: '0' }

           return (
             <div 
               key={idx}
               className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer"
               style={{ top: pos.top, left: pos.left }}
               onMouseEnter={() => setActiveStep(idx)}
             >
               {/* Map Node */}
               <div className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center text-3xl bg-black transition-all duration-300 z-20 ${
                 idx <= activeStep 
                   ? 'border-green-400 text-green-400 scale-125 shadow-[0_0_20px_rgba(74,222,128,0.6)] animate-bounce-slight' 
                   : 'border-gray-700 text-gray-700'
               }`}>
                 {step.icon}
                 
                 {/* Connection Dot */}
                 {idx < steps.length - 1 && (
                     <div className="absolute hidden"></div> 
                 )}
               </div>

               {/* Tooltip/Card */}
               <div className={`absolute top-20 w-48 text-center transition-all duration-500 ${
                 idx <= activeStep ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2 grayscale'
               }`}>
                 <div className="font-pixel text-green-400 text-sm mb-1">{step.step}</div>
                 <h3 className="font-pixel text-white text-md leading-tight mb-2 drop-shadow-md">{step.title}</h3>
                 <div className="bg-gray-900/90 p-2 rounded border border-gray-700 text-xs text-gray-300 shadow-xl backdrop-blur-sm">
                   {step.desc}
                 </div>
               </div>
               
               {/* "You are here" indicator */}
               {idx === activeStep && (
                 <div className="absolute -top-12 text-green-400 font-pixel text-xs animate-bounce whitespace-nowrap">
                   ▼ PLAYER
                 </div>
               )}
             </div>
           )
        })}

        {/* Player Sprite Moving (Bonus) */}
      </div>
    </div>
  )
}

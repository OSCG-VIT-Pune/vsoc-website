'use client'

import React from 'react'

/**
 * ArcadeCabinet Component (CSS 3D Version)
 * Uses hardware-accelerated CSS 3D transforms for a realistic look without WebGL
 */
export default function ArcadeCabinet({ 
  inserting = false,
  onAnimationComplete = () => {},
  onClick = () => {}
}) {
  return (
    <div className="relative w-full h-80 flex items-center justify-center perspective-1000 overflow-visible">
      
      {/* 3D Cabinet Assembly */}
      <div className="relative w-64 h-48 preserve-3d flex items-center justify-center animate-float" style={{ transform: 'rotateX(10deg)' }}>
        
        {/* Back Plate (Metal) */}
        <div className="absolute inset-0 bg-gray-800 rounded-xl border-4 border-gray-600 shadow-2xl flex items-center justify-center transform translate-z-0">
          {/* Screws */}
          {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(pos => (
            <div key={pos} className={`absolute ${pos} w-3 h-3 bg-gray-400 rounded-full shadow-inner flex items-center justify-center`}>
              <div className="w-full h-0.5 bg-gray-600 rotate-45"></div>
            </div>
          ))}
          
          {/* Neon Sign / Red Button */}
          <button 
            onClick={onClick}
            disabled={inserting}
            className="absolute top-6 bg-red-900/80 px-4 py-2 rounded border-2 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all hover:bg-red-800 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(255,0,0,0.8)] cursor-pointer group z-20"
            aria-label="Insert Coin"
          >
            <span className="text-xs sm:text-sm font-bold text-red-100 tracking-[0.2em] font-pixel shadow-red-glow animate-pulse group-hover:text-white">
              INSERT COIN
            </span>
          </button>
        </div>

        {/* Slot Housing (Protruding 3D Box) */}
        <div className="absolute top-20 w-24 h-20 preserve-3d transform translate-z-10">
           {/* Face */}
           <div className="absolute inset-0 bg-gray-900 border-x-2 border-t-2 border-gray-700 flex items-center justify-center translate-z-4">
             {/* The Slot Hole */}
             <div className="w-4 h-12 bg-black rounded-full border border-gray-700 shadow-[inset_0_0_5px_rgba(0,0,0,1)] relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-800 to-transparent opacity-50"></div>
             </div>
           </div>
           {/* Sides for depth */}
           <div className="absolute inset-y-0 left-0 w-4 bg-gray-800 origin-left rotate-y-90"></div>
           <div className="absolute inset-y-0 right-0 w-4 bg-gray-800 origin-right rotate-y--90"></div>
           <div className="absolute inset-x-0 top-0 h-4 bg-gray-700 origin-top rotate-x--90"></div>
           <div className="absolute inset-x-0 bottom-0 h-4 bg-gray-800 origin-bottom rotate-x-90"></div>
        </div>
      </div>

      {/* The 3D Coin (CSS) */}
      {inserting && (
        <div 
          className="absolute top-0 z-50 animate-insert-coin-3d preserve-3d"
          onAnimationEnd={onAnimationComplete}
        >
          {/* Coin Geometry */}
          <div className="w-16 h-16 relative preserve-3d animate-coin-spin">
            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 bg-yellow-400 flex items-center justify-center backface-hidden translate-z-1">
              <span className="font-pixel text-2xl text-yellow-700 font-bold">$</span>
            </div>
            {/* Thickness / Edge (Simulated with multiple layers or shadow) */}
            <div className="absolute inset-0 rounded-full bg-yellow-600 translate-z-0"></div>
            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 bg-yellow-400 flex items-center justify-center backface-hidden rotate-y-180 translate-z-1">
              <span className="font-pixel text-2xl text-yellow-700 font-bold">$</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

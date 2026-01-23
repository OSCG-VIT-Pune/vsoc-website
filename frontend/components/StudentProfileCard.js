'use client'

import React from 'react'

export default function StudentProfileCard() {
  return (
    <div className="border-4 border-cyan-600 bg-gradient-to-br from-gray-900 to-black p-6 rounded-none relative overflow-hidden group">
      
      {/* Decorative Scan Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 opacity-50 animate-scan"></div>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="w-24 h-24 mx-auto bg-gray-800 border-4 border-cyan-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          <span className="text-4xl">👨‍🚀</span>
        </div>
        <h2 className="font-pixel text-xl text-white pixel-text">PLAYER ONE</h2>
        <div className="text-cyan-400 font-pixel text-xs">RANK</div>
      </div>

      {/* Stats */}
      <div className="space-y-4 mb-8">
         <div className="bg-gray-800/50 p-3 border-l-4 border-yellow-400">
            <div className="text-xs text-gray-500 font-pixel mb-1">EXPERIENCE (XP)</div>
            <div className="flex items-end justify-between">
               <span className="text-2xl text-yellow-500 font-pixel">0</span>
               <span className="text-xs text-yellow-600/70 font-pixel mb-1">/ 5000</span>
            </div>
            {/* XP Bar */}
            <div className="h-2 bg-gray-700 mt-2 rounded-full overflow-hidden">
               <div className="h-full bg-yellow-400 w-[48%] animate-pulse-glow"></div>
            </div>
         </div>

         <div className="bg-gray-800/50 p-3 border-l-4 border-green-400">
            <div className="text-xs text-gray-500 font-pixel mb-1">LEVEL</div>
            <div className="text-2xl text-green-500 font-pixel">01</div>
         </div>
      </div>

      {/* Badges / Achievements */}
      <div>
         <h3 className="font-pixel text-sm text-cyan-400 mb-3 border-b border-gray-700 pb-2">ACHIEVEMENTS</h3>
         <div className="grid grid-cols-4 gap-2">
            <div className="aspect-square bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xl grayscale hover:grayscale-0 cursor-help transition-all" title="First Login">
               🔑
            </div>
            <div className="aspect-square bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xl grayscale hover:grayscale-0 cursor-help transition-all" title="Bug Hunter">
               🐛
            </div>
            <div className="aspect-square bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xl grayscale hover:grayscale-0 cursor-help transition-all" title="Code Warrior">
               ⚔️
            </div>
            <div className="aspect-square bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xl opacity-20">
               ❓
            </div>
         </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-500"></div>

    </div>
  )
}

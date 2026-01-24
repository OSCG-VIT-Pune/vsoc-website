'use client'

import React from 'react'

export default function StudentProjectCard({
  title,
  domain,
  studentsRequired,
  problemStatement,
  expectedSolution,
  repoLink,
  commsLink,
  mentorName,
  mentorBio
}) {
  return (
    <div className="border-4 border-purple-700 bg-gradient-to-br from-gray-900 to-black p-6 rounded-none relative group hover:border-purple-500 transition-all duration-300">
      
      {/* Mentor Info Section (Top) */}
      <div className="mb-6 bg-purple-900/10 border-2 border-purple-500/30 p-4 rounded-sm flex items-start gap-4">
         <div className="w-12 h-12 bg-purple-800 flex-shrink-0 flex items-center justify-center border-2 border-purple-400">
            <span className="text-xl">🧙‍♂️</span>
         </div>
         <div>
            <div className="text-xs text-purple-400 font-pixel mb-0.5">MISSION COMMANDER</div>
            <div className="font-pixel text-white text-sm mb-1">{mentorName}</div>
            <p className="text-xs text-gray-400 leading-tight italic line-clamp-2">"{mentorBio}"</p>
         </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs text-cyan-400 font-pixel mb-1">DOMAIN: {domain}</div>
          <h3 className="font-pixel text-xl text-white pixel-text group-hover:text-purple-300 transition-colors">{title}</h3>
        </div>
      </div>

      {/* Stats/Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 border-b-2 border-gray-800 pb-4">
        <div>
          <div className="text-xs text-gray-500 font-pixel">SQUAD SIZE</div>
          <div className="text-lg font-pixel text-yellow-400">{studentsRequired} PLAYERS</div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="font-pixel text-sm text-cyan-500 mb-1">MISSION BRIEF</h4>
          <p className="text-gray-300 text-sm line-clamp-3">{problemStatement}</p>
        </div>
        <div>
          <h4 className="font-pixel text-sm text-cyan-500 mb-1">VICTORY CONDITION</h4>
          <p className="text-gray-300 text-sm line-clamp-3">{expectedSolution}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {repoLink && (
           <a 
             href={repoLink}
             target="_blank"
             rel="noopener noreferrer"
             className="col-span-1 py-2 bg-gray-800 border-2 border-gray-600 text-center font-pixel text-xs text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-400 transition-all"
           >
             VIEW REPO
           </a>
        )}
        
        {commsLink && (
           <a 
             href={commsLink}
             target="_blank"
             rel="noopener noreferrer"
             className="col-span-1 py-2 bg-green-900/40 border-2 border-green-600 text-center font-pixel text-xs text-green-400 hover:bg-green-900/60 hover:text-green-300 hover:border-green-400 transition-all animate-pulse-glow"
           >
             JOIN COMMS
           </a>
        )}
      </div>

      {/* Pull Request Button */}
      {repoLink && (
        <a 
          href={`${repoLink}/compare`} 
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 mt-4 bg-gradient-to-r from-purple-700 to-purple-900 border-2 border-purple-500 text-center font-pixel text-white hover:from-purple-600 hover:to-purple-800 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
        >
          🚀 INITIATE PULL REQUEST
        </a>
      )}

      {/* Decorative Corner */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 clip-corner"></div>
    </div>
  )
}

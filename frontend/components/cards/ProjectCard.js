'use client'

import React from 'react'

export default function ProjectCard({
  id,
  title,
  domain,
  studentsRequired,
  problemStatement,
  expectedSolution,
  repoLink,
  commsLink,
  isActive = true,
  isCompleted = false,
  onToggle,
  onEdit,
  onDelete,
  onComplete
}) {
  return (
    <div className={`border-4 ${isCompleted ? 'border-yellow-600' : isActive ? 'border-cyan-700' : 'border-gray-700'} bg-gradient-to-br ${isCompleted ? 'from-yellow-900/20 to-black' : isActive ? 'from-gray-900 to-black' : 'from-gray-900 to-gray-800'} p-6 rounded-none relative group transition-all duration-300`}>
      {/* Header with Pixel Art Icon */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs text-cyan-400 font-pixel mb-1">DOMAIN: {domain}</div>
          <h3 className={`font-pixel text-xl ${isActive ? 'text-white' : 'text-gray-500'} pixel-text`}>{title}</h3>
        </div>
      </div>

      {/* Stats/Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 border-b-2 border-gray-800 pb-4">
        <div>
          <div className="text-xs text-gray-500 font-pixel">REQUIRED PLAYERS</div>
          <div className={`text-lg font-pixel ${isActive ? 'text-yellow-400' : 'text-gray-600'}`}>{studentsRequired}</div>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
           <div className="text-xs text-gray-500 font-pixel">STATUS</div>
           <div className="flex gap-2">
             {!isCompleted && (
               <button 
                 onClick={() => onComplete(id)}
                 className="font-pixel text-xs px-2 py-1 border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-900/30 transition-all"
                 title="Mark as Completed"
               >
                 ✓ COMPLETE
               </button>
             )}
             <button 
               onClick={() => onToggle(id)}
               className={`font-pixel text-sm px-3 py-1 border-2 ${
                 isCompleted
                   ? 'text-yellow-400 border-yellow-500 bg-yellow-900/20'
                   : isActive 
                     ? 'text-green-400 border-green-500 hover:bg-green-900/30' 
                     : 'text-red-400 border-red-500 hover:bg-red-900/30'
               } transition-all`}
               disabled={isCompleted}
             >
               {isCompleted ? '★ COMPLETED' : isActive ? '● ACTIVE' : '○ INACTIVE'}
             </button>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-4 mb-6 ${!isActive && 'opacity-50'}`}>
        <div>
          <h4 className="font-pixel text-sm text-cyan-500 mb-1">MISSION BRIEF (Problem)</h4>
          <p className="text-gray-300 text-sm">{problemStatement}</p>
        </div>
        <div>
          <h4 className="font-pixel text-sm text-cyan-500 mb-1">VICTORY CONDITION (Solution)</h4>
          <p className="text-gray-300 text-sm">{expectedSolution}</p>
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
             GITHUB
           </a>
        )}
        
        {commsLink && (
           <a 
             href={commsLink}
             target="_blank"
             rel="noopener noreferrer"
             className={`col-span-1 py-2 border-2 text-center font-pixel text-xs transition-all ${
               isActive 
                ? 'bg-green-900/40 border-green-600 text-green-400 hover:bg-green-900/60 hover:text-green-300 hover:border-green-400 animate-pulse-glow'
                : 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed'
             }`}
             onClick={(e) => !isActive && e.preventDefault()}
           >
             COMMS
           </a>
        )}
      </div>

      {/* Admin Controls */}
      <div className="flex gap-2 pt-3 border-t-2 border-gray-800">
        <button
          onClick={() => onEdit(id)}
          className="flex-1 py-2 bg-blue-900/20 border-2 border-blue-600 text-blue-400 font-pixel text-xs hover:bg-blue-900/40 hover:text-blue-300 transition-all"
        >
          EDIT PROJECT
        </button>
        <button
          onClick={() => onDelete(id)}
          className="flex-1 py-2 bg-red-900/20 border-2 border-red-600 text-red-400 font-pixel text-xs hover:bg-red-900/40 hover:text-red-300 transition-all"
        >
          DELETE
        </button>
      </div>

      {/* Decorative Corner */}
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${isActive ? 'bg-cyan-500' : 'bg-gray-600'} clip-corner`}></div>
    </div>
  )
}

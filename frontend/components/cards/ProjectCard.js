'use client'

import React from 'react'

export default function ProjectCard({
  id,
  title,
  description,
  repoLink,
  commsLink,
  isActive = true,
  isCompleted = false,
  onToggle,
  onEdit,
  onDelete,
  onComplete,
  variant = 'arcade' // 'arcade' | 'professional'
}) {
  const isProfessional = variant === 'professional'

  // Dynamic Styles based on Variant
  const containerClass = isProfessional
    ? `backdrop-blur-md border ${isCompleted ? 'bg-yellow-900/10 border-yellow-500/30' : isActive ? 'bg-white/5 border-cyan-500/30 shadow-lg shadow-cyan-900/20' : 'bg-white/5 border-white/10'} rounded-xl p-6 relative group transition-all duration-300 hover:border-cyan-500/50`
    : `border-4 ${isCompleted ? 'border-yellow-600' : isActive ? 'border-cyan-700' : 'border-gray-700'} bg-gradient-to-br ${isCompleted ? 'from-yellow-900/20 to-black' : isActive ? 'from-gray-900 to-black' : 'from-gray-900 to-gray-800'} p-6 rounded-none relative group transition-all duration-300`

  const titleClass = isProfessional
    ? `text-xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-gray-500'}`
    : `font-pixel text-xl ${isActive ? 'text-white' : 'text-gray-500'} pixel-text`

  const labelClass = isProfessional
    ? "text-[10px] font-bold tracking-wider text-gray-400 uppercase font-sans"
    : "text-xs text-gray-500 font-pixel"

  const buttonBaseClass = isProfessional
    ? "text-xs font-bold tracking-wide px-3 py-1.5 rounded transition-all flex items-center gap-2"
    : "font-pixel text-xs px-2 py-1 border-2 transition-all"

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={titleClass}>{title}</h3>
        </div>
        {isProfessional && isActive && (
           <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
        )}
      </div>

      {/* Stats/Details */}
      <div className={`grid grid-cols-2 gap-4 mb-4 ${isProfessional ? 'border-b border-white/10' : 'border-b-2 border-gray-800'} pb-4`}>
        <div className="col-span-2 text-right flex flex-col items-end gap-2">
           <div className={labelClass}>STATUS</div>
           <div className="flex gap-2">
             {!isCompleted && (
               <button 
                 onClick={() => onComplete(id)}
                 className={isProfessional 
                    ? `${buttonBaseClass} bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20`
                    : `${buttonBaseClass} border-yellow-500 text-yellow-400 hover:bg-yellow-900/30`
                 }
                 title="Mark as Completed"
               >
                 {isProfessional ? 'MARK COMPLETE' : '✓ COMPLETE'}
               </button>
             )}
             <button 
               onClick={() => onToggle(id)}
               className={isProfessional
                  ? `${buttonBaseClass} ${
                      isCompleted ? 'bg-yellow-500/20 text-yellow-500' 
                      : isActive ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    }`
                  : `font-pixel text-sm px-3 py-1 border-2 ${
                      isCompleted ? 'text-yellow-400 border-yellow-500 bg-yellow-900/20'
                      : isActive ? 'text-green-400 border-green-500 hover:bg-green-900/30' 
                      : 'text-red-400 border-red-500 hover:bg-red-900/30'
                    } transition-all`
               }
               disabled={isCompleted}
             >
               {isCompleted ? 'COMPLETED' : isActive ? 'ACTIVE' : 'INACTIVE'}
             </button>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-4 mb-6 ${!isActive && 'opacity-50'}`}>
        <div>
          <h4 className={`${labelClass} text-cyan-500 mb-1`}>PROJECT DESCRIPTION</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {repoLink && (
           <a 
             href={repoLink}
             target="_blank"
             rel="noopener noreferrer"
             className={isProfessional
                ? "col-span-1 py-2 rounded bg-white/5 border border-white/10 text-center text-xs font-bold text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
                : "col-span-1 py-2 bg-gray-800 border-2 border-gray-600 text-center font-pixel text-xs text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-400 transition-all"
             }
           >
             GITHUB REPO
           </a>
        )}
        
        {commsLink && (
           <a 
             href={commsLink}
             target="_blank"
             rel="noopener noreferrer"
             className={isProfessional
                ? `col-span-1 py-2 rounded border text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isActive 
                     ? 'bg-green-900/20 border-green-500/30 text-green-400 hover:bg-green-900/40 hover:border-green-500/50'
                     : 'bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed'
                  }`
                : `col-span-1 py-2 border-2 text-center font-pixel text-xs transition-all ${
                   isActive 
                    ? 'bg-green-900/40 border-green-600 text-green-400 hover:bg-green-900/60 hover:text-green-300 hover:border-green-400 animate-pulse-glow'
                    : 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed'
                  }`
             }
             onClick={(e) => !isActive && e.preventDefault()}
           >
             COMMUNICATION CHANNEL
           </a>
        )}
      </div>

      {/* Admin Controls */}
      <div className={`flex gap-2 pt-3 ${isProfessional ? 'border-t border-white/10' : 'border-t-2 border-gray-800'}`}>
        <button
          onClick={() => onEdit(id)}
          className={isProfessional
            ? "flex-1 py-2 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
            : "flex-1 py-2 bg-blue-900/20 border-2 border-blue-600 text-blue-400 font-pixel text-xs hover:bg-blue-900/40 hover:text-blue-300 transition-all"
          }
        >
          EDIT
        </button>
        <button
          onClick={() => onDelete(id)}
          className={isProfessional
            ? "flex-1 py-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 hover:border-red-500/40 transition-all"
            : "flex-1 py-2 bg-red-900/20 border-2 border-red-600 text-red-400 font-pixel text-xs hover:bg-red-900/40 hover:text-red-300 transition-all"
          }
        >
          DELETE
        </button>
      </div>

      {/* Decorative Corner - Only for Arcade */}
      {!isProfessional && (
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${isActive ? 'bg-cyan-500' : 'bg-gray-600'} clip-corner`}></div>
      )}
    </div>
  )
}

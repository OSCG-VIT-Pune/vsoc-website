import React from 'react'

export default function TeamMemberCard({ name, role, department, bio, image }) {
  return (
    <div className="relative group perspective-1000">
      {/* Card Container */}
      <div className="relative w-full bg-gray-900 border-4 border-cyan-800 p-1 transform transition-all duration-500 hover:scale-105 hover:rotate-y-12 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
        
        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-cyan-500 z-10"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 z-10"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-cyan-500 z-10"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 z-10"></div>

        {/* Inner Content */}
        <div className="bg-black/50 p-4 border border-cyan-900/50 h-full flex flex-col items-center text-center">
          
          {/* Image Container */}
          <div className="w-32 h-32 mb-4 relative overflow-hidden rounded-full border-4 border-gray-700 group-hover:border-cyan-400 transition-colors">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="font-pixel text-4xl text-gray-500">?</span>
              </div>
            )}
            {/* Glitch Overlay on Hover */}
            <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none"></div>
          </div>

          {/* Name & Role */}
          <h3 className="font-pixel text-xl text-yellow-400 mb-1 pixel-text tracking-wider">{name}</h3>
          <div className="text-xs font-bold text-cyan-300 bg-cyan-900/30 px-3 py-1 rounded mb-2 border border-cyan-700/50">
            {role}
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">
            {department}
          </div>

          {/* Bio/Stats */}
          <div className="w-full bg-gray-800/50 p-3 rounded border border-gray-700 text-left">
            <p className="font-mono text-xs text-gray-300 leading-relaxed italic">
              "{bio}"
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

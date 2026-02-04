import React from 'react'

export default function DomainCard({ title, icon, color = 'cyan', onClick }) {
  
  const colorMap = {
    cyan: {
      border: 'border-cyan-600',
      text: 'text-cyan-400',
      bg: 'bg-cyan-900/20',
      hover: 'group-hover:border-cyan-400',
      shadow: 'group-hover:shadow-cyan-500/30'
    },
    magenta: {
      border: 'border-fuchsia-600',
      text: 'text-fuchsia-400',
      bg: 'bg-fuchsia-900/20',
      hover: 'group-hover:border-fuchsia-400',
      shadow: 'group-hover:shadow-fuchsia-500/30'
    },
    yellow: {
      border: 'border-yellow-600',
      text: 'text-yellow-400',
      bg: 'bg-yellow-900/20',
      hover: 'group-hover:border-yellow-400',
      shadow: 'group-hover:shadow-yellow-500/30'
    },
    green: {
      border: 'border-green-600',
      text: 'text-green-400',
      bg: 'bg-green-900/20',
      hover: 'group-hover:border-green-400',
      shadow: 'group-hover:shadow-green-500/30'
    }
  }

  const styles = colorMap[color] || colorMap.cyan

  return (
    <button 
      onClick={onClick}
      className={`w-full text-left relative group transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className={`h-full bg-gray-900 border-4 ${styles.border} ${styles.hover} p-6 flex flex-col items-center justify-center gap-4 transition-all shadow-lg ${styles.shadow}`}>
        
        {/* Icon/Emoji */}
        <div className={`text-5xl mb-2 transform group-hover:scale-110 transition-transform`}>
          {icon}
        </div>

        {/* Title */}
        <h3 className={`font-pixel text-lg ${styles.text} text-center pixel-text leading-tight`}>
          {title}
        </h3>

        {/* "Press Start" Text */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 text-[10px] text-gray-400 font-pixel animate-pulse">
           VIEW SQUAD
        </div>

      </div>
      
      {/* Decorative Scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-0 group-hover:opacity-10 pointer-events-none"></div>
    </button>
  )
}

'use client'
import React from 'react'

export default function DomainModal({ isOpen, onClose, domainData }) {
  if (!isOpen || !domainData) return null

  // Ensure domainData has default values to prevent crashes
  const { title = 'Unknown Domain', heads = [], leads = [], members = [] } = domainData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Window */}
      <div className="relative w-full max-w-3xl bg-gray-900 border-4 border-white shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pixel-pop max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-800 p-4 border-b-4 border-gray-700 flex justify-between items-center">
          <h2 className="font-pixel text-2xl text-yellow-400 pixel-text uppercase tracking-widest">
            {title} SQUAD
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white font-pixel text-xl hover:rotate-90 transition-transform"
          >
            [X]
          </button>
        </div>

        {/* Scrolling Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-black/50">
          
          {/* Section: DOMAIN HEADS (If any) */}
          {heads.length > 0 && (
            <div className="mb-8 text-center">
              <h3 className="font-pixel text-cyan-400 text-lg mb-4 border-b-2 border-cyan-900 pb-2 inline-block px-8">
                COMMANDERS (HEADS)
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {heads.map((person, idx) => (
                  <div key={idx} className="bg-cyan-900/20 border-2 border-cyan-600 px-6 py-3 rounded text-center min-w-[150px]">
                     <div className="font-bold text-white font-sans text-lg">{person.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: DOMAIN LEADS (If any) */}
          {leads.length > 0 && (
            <div className="mb-8 text-center">
              <h3 className="font-pixel text-fuchsia-400 text-lg mb-4 border-b-2 border-fuchsia-900 pb-2 inline-block px-8">
                OFFICERS (LEADS)
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {leads.map((person, idx) => (
                  <div key={idx} className="bg-fuchsia-900/10 border border-fuchsia-600/50 px-4 py-2 rounded text-center">
                     <div className="font-bold text-gray-200 font-sans">{person.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: MEMBERS */}
          {members.length > 0 && (
            <div className="text-center">
              <h3 className="font-pixel text-green-400 text-lg mb-4 border-b-2 border-green-900 pb-2 inline-block px-8">
                OPERATIVES (MEMBERS)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                {members.map((person, idx) => (
                   <div key={idx} className="text-gray-400 font-mono text-sm hover:text-white transition-colors cursor-default">
                     {person.name}
                   </div>
                ))}
              </div>
            </div>
          )}

          {heads.length === 0 && leads.length === 0 && members.length === 0 && (
             <div className="text-center py-12 text-gray-600 font-pixel">
               NO DATA AVAILABLE FOR THIS SQUAD
             </div>
          )}

        </div>

        {/* Footer Decorative Bar */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-500"></div>

      </div>
    </div>
  )
}

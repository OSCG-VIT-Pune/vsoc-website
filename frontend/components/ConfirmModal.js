'use client'

import React from 'react'

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'CONFIRM ACTION', 
  message = 'ARE YOU SURE?' 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-gray-900 border-4 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)] p-8 animate-pixel-pop">
        
        {/* Warning Icon */}
        <div className="text-center mb-6">
          <div className="text-6xl animate-pulse">⚠️</div>
        </div>

        <h3 className="text-center font-pixel text-2xl text-red-500 mb-4 pixel-text">
          {title}
        </h3>
        
        <p className="text-center text-gray-300 mb-8 font-sans text-lg">
          {message}
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-gray-800 border-4 border-gray-600 text-gray-400 font-pixel hover:bg-gray-700 hover:text-white hover:border-white transition-all"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-4 bg-red-900 border-4 border-red-500 text-white font-pixel hover:bg-red-800 hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            CONFIRM DELETE
          </button>
        </div>

        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-500"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500"></div>
      </div>
    </div>
  )
}

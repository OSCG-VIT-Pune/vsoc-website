'use client'

import React from 'react'

/**
 * ArcadeCabinet Component
 * Displays a 3D coin insertion slot and handles the coin animation
 */
export default function ArcadeCabinet({ 
  inserting = false,
  onAnimationComplete = () => {}
}) {
  return (
    <div className="relative w-full h-40 flex items-center justify-center perspective-1000">
      {/* 3D Coin Slot Assembly */}
      <div className="relative w-48 h-32 preserve-3d rotate-x-20">
        
        {/* Slot Front Plate */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg border-4 border-gray-600 shadow-2xl flex flex-col items-center justify-center transform translate-z-0">
          {/* Screw Heads */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-gray-400 rounded-full shadow-inner flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-600 rotate-45"></div>
          </div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-gray-400 rounded-full shadow-inner flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-600 rotate-45"></div>
          </div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-400 rounded-full shadow-inner flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-600 rotate-45"></div>
          </div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-400 rounded-full shadow-inner flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-600 rotate-45"></div>
          </div>

          {/* Label */}
          <div className="mb-4 bg-red-600 px-3 py-1 rounded border-2 border-red-800 shadow-lg">
            <span className="text-[10px] font-bold text-white tracking-widest font-silkscreen shadow-black drop-shadow-md">
              INSERT COIN
            </span>
          </div>

          {/* The Slot Opening */}
          <div className="relative w-16 h-24 bg-black rounded shadow-[inset_0_0_10px_rgba(0,0,0,1)] overflow-hidden border border-gray-800">
            {/* Inner mechanical bits */}
             <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-gray-800 to-transparent opacity-50"></div>
             <div className="absolute inset-x-2 top-0 bottom-0 bg-gray-900 mx-auto w-1"></div>
          </div>
          
          {/* Metallic Shine Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 pointer-events-none rounded-lg"></div>
        </div>
      </div>

      {/* The 3D Coin */}
      {inserting && (
        <div 
          className="absolute z-50 animate-insert-coin-3d coin-3d w-16 h-16"
          onAnimationEnd={onAnimationComplete}
        >
          <div className="coin-face coin-front">
            <span className="text-2xl">⚡</span>
          </div>
          <div className="coin-edge"></div>
          <div className="coin-face coin-back">
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      )}
    </div>
  )
}

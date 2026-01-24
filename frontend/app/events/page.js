'use client'

import React from 'react'
import { SectionTitle, ArcadeButton, HUD } from '@/components'
import { useRouter } from 'next/navigation'

export default function EventsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen pt-24 px-4 pb-24">
      <HUD />
      <SectionTitle title="UPCOMING EVENTS" />
      
      <div className="max-w-4xl mx-auto mt-8 grid gap-8">
        
        {/* Event Card */}
        <div className="bg-black/80 border-4 border-green-600 p-6 rounded-lg backdrop-blur relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-green-600 text-black font-bold font-pixel px-3 py-1 text-xs">
            LIVE NOW
          </div>
          <h2 className="text-2xl font-pixel text-green-400 mb-2">VSoC 2026</h2>
          <p className="text-gray-400 text-sm font-mono mb-4">The ultimate open-source championship.</p>
          <div className="text-gray-300 space-y-2 mb-6 text-sm">
             <div className="flex justify-between border-b border-gray-800 pb-1">
               <span>STATUS:</span>
               <span className="text-green-400">ONLINE</span>
             </div>
             <div className="flex justify-between border-b border-gray-800 pb-1">
               <span>DATE:</span>
               <span>SUMMER 2026</span>
             </div>
          </div>
          <ArcadeButton onClick={() => router.push('/')} variant="primary">
            JOIN SERVER
          </ArcadeButton>
        </div>

        {/* Past Event */}
        <div className="bg-black/60 border-4 border-gray-700 p-6 rounded-lg backdrop-blur opacity-75">
          <h2 className="text-xl font-pixel text-gray-400 mb-2">GIT WORKSHOP</h2>
          <p className="text-gray-500 text-sm font-mono">Introductory session on Git & GitHub.</p>
          <div className="mt-4 text-xs text-gray-600 font-pixel">
            [ MISSION COMPLETED ]
          </div>
        </div>

      </div>
      
      <div className="mt-12 text-center">
        <ArcadeButton onClick={() => router.push('/')}>
           RETURN TO BASE
        </ArcadeButton>
      </div>

    </div>
  )
}

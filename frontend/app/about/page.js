'use client'

import React from 'react'
import { SectionTitle, ArcadeButton, HUD } from '@/components'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen pt-24 px-4 pb-24">
      <HUD />
      <SectionTitle title="ABOUT OSCG" />
      
      <div className="max-w-4xl mx-auto mt-8 bg-black/80 border-4 border-gray-700 p-8 rounded-lg backdrop-blur">
        <h2 className="text-2xl font-pixel text-yellow-400 mb-6">MISSION BRIEFING</h2>
        <div className="space-y-4 text-gray-300 font-mono leading-relaxed">
          <p>
            Open Source Contributions and GitHub (OSCG) is a student chapter at VIT Pune dedicated to fostering open-source culture.
          </p>
          <p>
            Our mission is to bridge the gap between academic learning and real-world software development through mentorship, hackathons, and collaborative projects.
          </p>
          <p>
            VSoC (Vishwakarma Summer of Code) is our flagship event, designed to gamify the experience of contributing to open source.
          </p>
        </div>

        <div className="mt-12 text-center">
            <ArcadeButton onClick={() => router.push('/')}>
              RETURN TO BASE
            </ArcadeButton>
        </div>
      </div>
    </div>
  )
}

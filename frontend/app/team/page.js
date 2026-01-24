'use client'

import React from 'react'
import { SectionTitle, ArcadeButton, HUD } from '@/components'
import { useRouter } from 'next/navigation'

export default function TeamPage() {
  const router = useRouter()

  const teamMembers = [
    { name: 'Dr. Faculty Guide', role: 'MENTOR', level: 99 },
    { name: 'Core Team', role: 'ADMINS', level: 'MAX' },
    { name: 'Tech Team', role: 'DEVELOPERS', level: 85 },
    { name: 'Management', role: 'OPERATORS', level: 80 }
  ]

  return (
    <div className="min-h-screen pt-24 px-4 pb-24">
      <HUD />
      <SectionTitle title="OSCG SQUAD" />
      
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-gray-900/80 border-2 border-cyan-700 p-4 flex items-center justify-between hover:bg-gray-800 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 border-2 border-gray-600 flex items-center justify-center font-pixel text-2xl text-gray-500 group-hover:text-cyan-400 group-hover:border-cyan-500 transition-all">
                {member.name[0]}
              </div>
              <div>
                <h3 className="font-pixel text-white text-sm">{member.name}</h3>
                <div className="text-xs text-cyan-500 font-mono">{member.role}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500 font-pixel">LVL</div>
              <div className="font-pixel text-yellow-500">{member.level}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
          <ArcadeButton onClick={() => router.push('/')}>
            RETURN TO BASE
          </ArcadeButton>
      </div>
    </div>
  )
}

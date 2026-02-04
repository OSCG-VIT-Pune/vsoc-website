'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StudentProfileCard, StudentProjectCard } from '@/components'
import { useAuth } from '@/context/AuthContext'

export default function StudentDashboard() {
  const { logout } = useAuth()
  
  // Mock Data with Mentor Info
  const [projects] = useState([
    {
      id: 1,
      title: 'Galactic Defense Protocol',
      domain: 'Cybersecurity',
      studentsRequired: '2',
      problemStatement: 'The network is under attack from quantum anomalies. We need a robust firewall.',
      expectedSolution: 'A Python-based intrusion detection system using ML algorithms.',
      repoLink: 'https://github.com/vsoc/galactic-defense',
      commsLink: 'https://discord.gg/example',
      mentorName: 'Cmdr. Shepard',
      mentorBio: 'Veteran system architect with 10 years in cyber-warfare simulation.'
    },
    {
      id: 2,
      title: 'Nebula Usage Analyzer',
      domain: 'Data Science',
      studentsRequired: '3',
      problemStatement: 'Star clusters are consuming excessive energy. We need to analyze the logs.',
      expectedSolution: 'A dashboard visualizing energy spikes across the sector.',
      repoLink: 'https://github.com/vsoc/nebula-viz',
      commsLink: 'https://discord.gg/example2',
      mentorName: 'Dr. T\'Soni',
      mentorBio: 'Xeno-archaeologist turned data scientist. Loves old code.'
    },
    {
        id: 3,
        title: 'Quantum Relay Chat',
        domain: 'Web Development',
        studentsRequired: '4',
        problemStatement: 'Communication lag between stations is unacceptable.',
        expectedSolution: 'Real-time chat app using WebSockets and React.',
        repoLink: 'https://github.com/vsoc/quantum-chat',
        commsLink: 'https://discord.gg/example3',
        mentorName: 'Eng. Scott',
        mentorBio: 'Can fix anything with a wrench and some JavaScript.'
      }
  ])

  // Search State
  const [searchQuery, setSearchQuery] = useState('')

  // Filter projects by Mentor Name
  const filteredProjects = projects.filter(project => 
    project.mentorName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-20">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 pt-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Student Profile & Stats */}
        <div className="lg:col-span-1 space-y-6 animate-slide-right">
           <StudentProfileCard />
           
           {/* Mobile Only: VSOC Channel Button */}
           <a 
               href="https://chat.whatsapp.com/vsoc-general" 
               target="_blank"
               rel="noopener noreferrer"
               className="md:hidden flex w-full items-center justify-center gap-2 bg-green-900/50 border-2 border-green-500 px-3 py-3 font-pixel text-sm text-green-400 hover:bg-green-900 transition-all"
            >
               <span>💬</span> JOIN VSOC HQ CHANNEL
            </a>
        </div>

        {/* Right Column: Project Search & List */}
        <div className="lg:col-span-2 animate-slide-left">
          
          {/* Search Header */}
          <div className="bg-gradient-to-r from-gray-900 to-black border-4 border-gray-700 p-6 rounded-none mb-6">
             <div className="flex items-center justify-between mb-4">
                <h2 className="font-pixel text-2xl text-purple-400 pixel-text">AVAILABLE PROJECTS</h2>
                <div className="text-gray-500 font-pixel text-sm">{filteredProjects.length} FOUND</div>
             </div>
             
             {/* Search Bar */}
             <div className="relative mb-2">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH BY COMMANDER (MENTOR NAME)..."
                  className="w-full bg-gray-800 border-2 border-gray-600 text-white font-pixel px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                />
                <div className="absolute right-3 top-3 text-gray-500">🔍</div>
             </div>

             <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-purple-500 w-full animate-pulse-glow"></div>
             </div>
          </div>

          {/* Scrollable Project Container */}
          <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid gap-6">
              {filteredProjects.map((project) => (
                <StudentProjectCard 
                  key={project.id}
                  {...project}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 border-4 border-dashed border-gray-800">
                <div className="text-6xl mb-4 grayscale opacity-50">
                  {searchQuery ? '🔭' : '📜'}
                </div>
                <p className="font-pixel text-gray-500">
                  {searchQuery ? 'NO MISSION COMMANDER FOUND' : 'NO MISSIONS AVAILABLE'}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  )
}

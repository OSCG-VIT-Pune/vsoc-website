'use client'

import React, { useState } from 'react'
import { SectionTitle, ArcadeButton } from '@/components'
import { useRouter } from 'next/navigation'

export default function LeaderboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('student') // 'student' or 'mentor'

  // Mock Data - In a real app, this would come from an API
  const studentData = [
    { rank: 1, name: 'CyberNinja', xp: 5400, badges: ['/badges/vsoc_legend.png', '/badges/bug_hunter.png', '/badges/first_pull.png'], prs: 42 },
    { rank: 2, name: 'CodeWizard', xp: 4850, badges: ['/badges/feature_architect.png', '/badges/first_commit.png'], prs: 35 },
    { rank: 3, name: 'BugHunter', xp: 4200, badges: ['/badges/issue_slayer.png', '/badges/consistency_champ.png'], prs: 28 },
    { rank: 4, name: 'PixelArtist', xp: 3800, badges: ['/badges/os_collaborator.png'], prs: 22 },
    { rank: 5, name: 'GitMaster', xp: 3500, badges: ['/badges/first_commit.png'], prs: 19 },
  ]

  const mentorData = [
    { rank: 1, name: 'Dr. Code', projects: 5, completed: 3, badges: ['/badges/best_mentor.png', '/badges/goat.png'] },
    { rank: 2, name: 'Prof. Byte', projects: 4, completed: 2, badges: ['/badges/code_reviewer.png'] },
    { rank: 3, name: 'Mentor Mike', projects: 3, completed: 1, badges: ['/badges/pr_pro.png'] },
  ]

  return (
    <div className="min-h-screen pt-24 px-4 pb-24">
      <SectionTitle title="HALL OF FAME" />

      <div className="max-w-5xl mx-auto mt-8">
        
        {/* Tab Selection */}
        <div className="flex justify-center gap-4 mb-8 relative z-10">
          <button
            onClick={() => {
              console.log('Switching to student')
              setActiveTab('student')
            }}
            className={`px-6 py-3 font-pixel text-sm border-b-4 transition-all ${
              activeTab === 'student' 
                ? 'border-yellow-400 text-yellow-400 bg-yellow-900/20' 
                : 'border-gray-700 text-gray-500 hover:text-gray-300'
            }`}
          >
            STUDENT LEADERBOARD
          </button>
          <button
            onClick={() => {
              console.log('Switching to mentor')
              setActiveTab('mentor')
            }}
            className={`px-6 py-3 font-pixel text-sm border-b-4 transition-all ${
              activeTab === 'mentor' 
                ? 'border-cyan-400 text-cyan-400 bg-cyan-900/20' 
                : 'border-gray-700 text-gray-500 hover:text-gray-300'
            }`}
          >
            MENTOR LEADERBOARD
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-black/80 border-4 border-gray-700 p-6 rounded-lg backdrop-blur overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b-2 border-gray-600">
                 <th className="p-4 font-pixel text-gray-400 text-sm">RANK</th>
                 <th className="p-4 font-pixel text-gray-400 text-sm">PLAYER</th>
                 {activeTab === 'student' ? (
                   <>
                     <th className="p-4 font-pixel text-cyan-400 text-sm">XP</th>
                     <th className="p-4 font-pixel text-gray-400 text-sm">BADGES</th>
                     <th className="p-4 font-pixel text-green-400 text-sm">PRs MERGED</th>
                   </>
                 ) : (
                   <>
                     <th className="p-4 font-pixel text-cyan-400 text-sm">PROJECTS</th>
                     <th className="p-4 font-pixel text-green-400 text-sm">COMPLETED</th>
                     <th className="p-4 font-pixel text-gray-400 text-sm">BADGES</th>
                   </>
                 )}
               </tr>
             </thead>
             <tbody>
               {(activeTab === 'student' ? studentData : mentorData).map((player, index) => (
                 <tr 
                  key={`${activeTab}-${index}`} 
                  className={`border-b border-gray-800 hover:bg-white/5 transition-colors ${
                    index === 0 ? 'bg-yellow-900/10' : ''
                  }`}
                >
                   <td className="p-4 font-pixel text-xl">
                     {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${player.rank}`}
                   </td>
                   <td className="p-4 font-bold text-white font-mono">
                     {player.name}
                     {index === 0 && <span className="ml-2 text-yellow-400 text-xs font-pixel">👑 LEADER</span>}
                   </td>
                   
                   {activeTab === 'student' ? (
                     <>
                        <td className="p-4 font-pixel text-cyan-300">{player.xp}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {player.badges.map((badge, i) => (
                              <img 
                                key={i} 
                                src={badge} 
                                alt="Badge" 
                                className="w-8 h-8 object-contain hover:scale-125 transition-transform" 
                                title={badge.split('/').pop().replace('.png', '').replace('_', ' ').toUpperCase()}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-pixel text-green-400">{player.prs}</td>
                     </>
                   ) : (
                     <>
                        <td className="p-4 font-pixel text-cyan-300">{player.projects}</td>
                        <td className="p-4 font-pixel text-green-400">{player.completed}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {player.badges.map((badge, i) => (
                              <img 
                                key={i} 
                                src={badge} 
                                alt="Badge" 
                                className="w-8 h-8 object-contain hover:scale-125 transition-transform"
                                title={badge.split('/').pop().replace('.png', '').replace('_', ' ').toUpperCase()} 
                              />
                            ))}
                          </div>
                        </td>
                     </>
                   )}
                 </tr>
               ))}
             </tbody>
           </table>
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

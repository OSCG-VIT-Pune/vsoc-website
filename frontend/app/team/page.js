'use client'

import React, { useState } from 'react'
import { SectionTitle, ArcadeButton } from '@/components'
import TeamMemberCard from '@/components/cards/TeamMemberCard'
import DomainCard from '@/components/cards/DomainCard'
import DomainModal from '@/components/modals/DomainModal'
import { useRouter } from 'next/navigation'

export default function TeamPage() {
  const router = useRouter()
  const [activeDomain, setActiveDomain] = useState(null)

  // 1. Core Team Data (The Brains)
  const coreTeam = [
    { 
      name: 'Aadesh Deshmukh', 
      role: 'Secretary', 
      department: 'CSE-DS',
      bio: 'Curious engineering student driven to solve real-world problems- always learning, exploring, and turning ideas into impact.',
      image: '/brains/aadesh.jpg' 
    },
    { 
      name: 'Aditya Kale', 
      role: 'Chairperson', 
      department: 'CSE-DS',
      bio: 'The open source big brain behind OSCG',
      image: '/brains/aditya.jpeg' 
    },
    { 
      name: 'Sharayu Itkikar', 
      role: 'Treasurer', 
      department: 'Design',
      bio: 'tracking budgets, managing sponsorships and believing open-source makes tech better for everyone!',
      image: '/brains/sharayu.jpeg'
    }
  ]

  // 2. Domain Data
  const domains = [
    { 
      id: 'technical', 
      title: 'TECHNICAL', 
      icon: '💻', 
      color: 'cyan',
      data: {
        title: 'Technical Domain',
        heads: [{ name: 'Apurv Saktepar' },{ name: 'Pranil Jatkar' }],
        leads: [{ name: 'Aaditya Kalmekh' }, { name: 'Krushnansh Meher' }, { name: 'Pranit Dhanade' }],
        members: [{ name: 'Siddhesh Chavan' }, { name: 'Atharv Bodkhe' }, { name: 'Kartik Bhand' }, { name: 'Aary Gaikwad' }]
      }
    },
    { 
      id: 'docs', 
      title: 'DOCUMENTATION', 
      icon: '📝', 
      color: 'yellow',
      data: {
        title: 'Documentation',
        heads: [{ name: 'Omar Khan' },{ name: 'Purva Patil' }],
        leads: [],
        members: [{ name: 'Prajwal Nalawade' }]
      }
    },
    { 
      id: 'sponsorship', 
      title: 'SPONSORSHIP & FINANCES', 
      icon: '💰', 
      color: 'green',
      data: {
        title: 'Sponsorship & Finance',
        heads: [{ name: 'Pralhad Chape' },{ name: 'Swaraj Gaikwad' },{name: 'Manasvi Dhawale'}],
        leads: [],
        members: [{name: 'Yashasvi Peddintti'}]
      }
    },
    { 
      id: 'content', 
      title: 'CONTENT & VIDEOGRAPHY', 
      icon: '🎬', 
      color: 'magenta',
      data: {
        title: 'Content & Videography',
        heads: [{ name: 'Ajay Bhalekar' }],
        leads: [],
        members: [{ name: 'Vaishnavi Benjarwad' }, { name: 'Kanishka Sawale' }]
      }
    }
  ]

  return (
    <div className="min-h-screen pt-32 px-4 pb-24 relative overflow-hidden bg-black selection:bg-yellow-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <SectionTitle title="THE BRAINS BEHIND VSOC" />
      <div className="font-pixel text-white text-2xl text-center mb-5">THE BRAINS BEHIND VSoC</div>
      <div className="max-w-7xl mx-auto mt-16 relative z-10">
        {/* Top Section: Core Team */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4 md:px-12">
           {coreTeam.map((member, index) => (
             <TeamMemberCard key={index} {...member} />
           ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-16 opacity-50">
           <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full max-w-lg"></div>
           <div className="mx-4 font-pixel text-cyan-500 text-xl">SQUADS</div>
           <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full max-w-lg"></div>
        </div>

        {/* Bottom Section: Domains */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {domains.map((domain) => (
             <DomainCard 
               key={domain.id}
               title={domain.title} 
               icon={domain.icon} 
               color={domain.color}
               onClick={() => setActiveDomain(domain.data)}
             />
           ))}
        </div>

      </div>

      <div className="mt-20 text-center relative z-10">
          <ArcadeButton onClick={() => router.push('/')}>
            RETURN TO BASE
          </ArcadeButton>
      </div>

      {/* Domain Modal */}
      <DomainModal 
        isOpen={!!activeDomain} 
        onClose={() => setActiveDomain(null)} 
        domainData={activeDomain} 
      />

    </div>
  )
}

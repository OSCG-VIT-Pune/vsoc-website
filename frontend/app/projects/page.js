'use client'

import React, { useState } from 'react'
import { SectionTitle } from '@/components'
import { useRouter } from 'next/navigation'

export default function ProjectsPage() {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState('all') // all, active, completed

  // Sample projects data - can be replaced with API data
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Code Analyzer',
      category: 'Machine Learning',
      status: 'active',
      description: 'Analyze code quality using advanced AI algorithms to detect vulnerabilities and optimize performance.',
      progress: 65,
      team: 5,
      techStack: ['Python', 'TensorFlow', 'FastAPI'],
      difficulty: 'Hard',
      startDate: '2026-01-15',
      endDate: '2026-03-15',
    },
    {
      id: 2,
      title: 'IoT Smart Home Hub',
      category: 'Robotics & IoT',
      status: 'active',
      description: 'Build an integrated smart home control system with real-time device synchronization.',
      progress: 45,
      team: 4,
      techStack: ['Node.js', 'MQTT', 'React'],
      difficulty: 'Hard',
      startDate: '2026-01-20',
      endDate: '2026-04-20',
    },
    {
      id: 3,
      title: 'Quantum Computing Simulator',
      category: 'Advanced Computing',
      status: 'active',
      description: 'Simulate quantum circuits and algorithms for educational purposes.',
      progress: 30,
      team: 3,
      techStack: ['Python', 'Qiskit', 'NumPy'],
      difficulty: 'Hard',
      startDate: '2026-02-01',
      endDate: '2026-05-01',
    },
    {
      id: 4,
      title: 'Blockchain Voting System',
      category: 'Blockchain',
      status: 'completed',
      description: 'Create a secure and transparent voting system using blockchain technology.',
      progress: 100,
      team: 6,
      techStack: ['Solidity', 'Ethereum', 'Web3.js'],
      difficulty: 'Hard',
      startDate: '2025-12-01',
      endDate: '2026-01-31',
    },
    {
      id: 5,
      title: 'Real-Time Data Visualization',
      category: 'Data Science',
      status: 'active',
      description: 'Interactive dashboard for visualizing large-scale real-time data streams.',
      progress: 55,
      team: 4,
      techStack: ['React', 'D3.js', 'WebSocket'],
      difficulty: 'Medium',
      startDate: '2026-01-25',
      endDate: '2026-03-30',
    },
    {
      id: 6,
      title: 'Autonomous Navigation System',
      category: 'Robotics & IoT',
      status: 'completed',
      description: 'Develop autonomous navigation algorithms for robotic systems.',
      progress: 100,
      team: 5,
      techStack: ['C++', 'ROS', 'SLAM'],
      difficulty: 'Hard',
      startDate: '2025-11-15',
      endDate: '2026-01-15',
    },
  ]

  const filteredProjects = projects.filter(project => {
    if (filterStatus === 'all') return true
    return project.status === filterStatus
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'from-emerald-500 to-cyan-500'
      case 'Medium':
        return 'from-cyan-500 to-blue-500'
      case 'Hard':
        return 'from-cyan-400 to-purple-500'
      default:
        return 'from-cyan-500 to-ice-blue'
    }
  }

  const getDifficultyTextColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-400'
      case 'Medium':
        return 'text-cyan-400'
      case 'Hard':
        return 'text-purple-300'
      default:
        return 'text-cyan-300'
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="ACTIVE PROJECTS" />
          
          <div className="mt-8 text-center mb-12">
            <p className="text-cyan-300 text-lg tracking-wide max-w-3xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '400' }}>
              Join cutting-edge projects powered by students, mentored by industry experts. 
              Push the boundaries of innovation with VSoC.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['all', 'active', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 ${
                  filterStatus === status
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'border-cyan-400/30 text-cyan-300 hover:border-cyan-400 hover:text-cyan-400'
                }`}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {status === 'all' ? 'All Projects' : status === 'active' ? 'Active' : 'Completed'}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative"
              >
                {/* Card background with gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                
                <div className="relative bg-gradient-to-br from-slate-900/80 via-blue-900/50 to-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 transition-all duration-300 group-hover:border-cyan-400/50 h-full flex flex-col">
                  
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      project.status === 'active'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50'
                    }`}>
                      {project.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${getDifficultyColor(project.difficulty)} text-white border border-cyan-400/30`}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.1em' }}>
                    {project.title}
                  </h3>

                  {/* Category */}
                  <p className="text-cyan-400/70 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.75rem' }}>
                    {project.category}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400 uppercase" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Progress</span>
                      <span className="text-xs font-bold text-cyan-300">{project.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden border border-cyan-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-cyan-300 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 uppercase mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team & Timeline */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="bg-cyan-500/5 border border-cyan-400/20 rounded p-2">
                      <p className="text-gray-400 uppercase tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.75rem' }}>Team Size</p>
                      <p className="text-cyan-300 font-bold text-lg">{project.team}</p>
                    </div>
                    <div className="bg-cyan-500/5 border border-cyan-400/20 rounded p-2">
                      <p className="text-gray-400 uppercase tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.75rem' }}>Duration</p>
                      <p className="text-cyan-300 font-bold">
                        {Math.ceil((new Date(project.endDate) - new Date(project.startDate)) / (1000 * 60 * 60 * 24 / 30))} mo
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-auto px-4 py-3 text-xs font-bold uppercase tracking-widest text-cyan-300 border-2 border-cyan-400/50 bg-cyan-500/5 rounded transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/15 hover:text-cyan-200 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    VIEW PROJECT →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/5 border border-cyan-400/30 rounded-xl p-6 text-center backdrop-blur-xl">
              <p className="text-cyan-400 text-2xl font-bold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{projects.length}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Total Projects</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/5 border border-cyan-400/30 rounded-xl p-6 text-center backdrop-blur-xl">
              <p className="text-emerald-400 text-2xl font-bold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{projects.filter(p => p.status === 'active').length}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Active Now</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/5 border border-cyan-400/30 rounded-xl p-6 text-center backdrop-blur-xl">
              <p className="text-yellow-400 text-2xl font-bold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{projects.filter(p => p.status === 'completed').length}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Completed</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/5 border border-cyan-400/30 rounded-xl p-6 text-center backdrop-blur-xl">
              <p className="text-purple-300 text-2xl font-bold mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{projects.reduce((sum, p) => sum + p.team, 0)}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Contributors</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 border-t border-cyan-400/20">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4 uppercase tracking-widest" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Ready to Contribute?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Join our community of developers, innovators, and open-source enthusiasts. 
              Gain real-world experience while building amazing projects.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-cyan-300 border-2 border-cyan-400 bg-cyan-500/10 rounded transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Apply Now
              </button>
              <button 
                onClick={() => router.push('/')}
                className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-purple-300 border-2 border-purple-400/50 bg-purple-500/5 rounded transition-all duration-300 hover:border-purple-300 hover:bg-purple-500/15 hover:text-purple-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

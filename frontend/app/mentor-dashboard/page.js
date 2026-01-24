'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectCard, AddProjectForm, ConfirmModal, EditProjectModal } from '@/components'

export default function MentorDashboard() {
  const router = useRouter()
  // State for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Galactic Defense Protocol',
      domain: 'Cybersecurity',
      studentsRequired: '2',
      problemStatement: 'The network is under attack from quantum anomalies. We need a robust firewall to protect the core.',
      expectedSolution: 'A Python-based intrusion detection system using ML algorithms.',
      repoLink: 'https://github.com/vsoc/galactic-defense',
      commsLink: 'https://discord.gg/example',
      isActive: true
    }
  ])

  // State for editing
  const [editingProject, setEditingProject] = useState(null)

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    projectId: null
  })

  // State for search
  const [searchQuery, setSearchQuery] = useState('')

  // Filtered projects
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProject = (newProject) => {
    setProjects(prev => [
      { id: Date.now(), ...newProject, isActive: true },
      ...prev
    ])
  }

  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleUpdateProject = (updatedProject) => {
    setProjects(prev => prev.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ))
    setEditModalOpen(false)
    setEditingProject(null)
  }

  const handleToggle = (id) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
  }

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, projectId: id })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.projectId) {
      setProjects(prev => prev.filter(p => p.id !== deleteModal.projectId))
      // If deleting the currently edited project, clear edit mode
      if (editingProject?.id === deleteModal.projectId) {
        setEditingProject(null)
      }
      setDeleteModal({ isOpen: false, projectId: null })
      alert('SYSTEM ALERT: PROJECT DATA PURGED')
    }
  }

  const handleEdit = (id) => {
    const projectToEdit = projects.find(p => p.id === id)
    if (projectToEdit) {
      setEditingProject(projectToEdit)
      setEditModalOpen(true)
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-20">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none"></div>

      {/* Modals */}
      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, projectId: null })}
        onConfirm={handleConfirmDelete}
        title="WARNING: DATA PURGE"
        message="This action is irreversible. Are you surely you want to delete this project?"
      />

      <EditProjectModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={editingProject}
        onUpdate={handleUpdateProject}
      />

      {/* HUD */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b-4 border-cyan-500 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push('/')}
              className="font-pixel text-sm text-cyan-400 hover:text-cyan-300 transition-colors pixel-text"
            >
              ← LOGOUT
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-float">👨‍🏫</div>
            <div className="text-right">
              <div className="text-xs text-gray-400">COMMANDER</div>
              <div className="font-pixel text-xl text-cyan-400 pixel-text">
                MENTOR DASHBOARD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
       {/* Left Column: Add Project Form (Cleaned) */}
        <div className="lg:col-span-1 animate-slide-right">
           <AddProjectForm 
             onAddProject={handleAddProject} 
           />
        </div>

        {/* Right Column: Project List */}
        <div className="lg:col-span-2 animate-slide-left">
          <div className="bg-gradient-to-r from-gray-900 to-black border-4 border-gray-700 p-6 rounded-none mb-6">
             <div className="flex items-center justify-between mb-4">
                <h2 className="font-pixel text-2xl text-yellow-400 pixel-text">ACTIVE PROJECTS</h2>
                <div className="text-gray-500 font-pixel text-sm">{filteredProjects.length} FOUND</div>
             </div>
             
             {/* Search Bar */}
             <div className="relative mb-2">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH PROJECT (TITLE)..."
                  className="w-full bg-gray-800 border-2 border-gray-600 text-white font-pixel px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-600"
                />
                <div className="absolute right-3 top-3 text-gray-500">🔍</div>
             </div>

             <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-yellow-500 w-full animate-pulse-glow"></div>
             </div>
          </div>

          {/* Scrollable Project Container */}
          <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  {...project}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 border-4 border-dashed border-gray-800">
                <div className="text-6xl mb-4 grayscale opacity-50">
                  {searchQuery ? '🔭' : '🕹️'}
                </div>
                <p className="font-pixel text-gray-500">
                  {searchQuery ? 'NO MATCHES FOUND' : 'NO PROJECTS LISTED'}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}

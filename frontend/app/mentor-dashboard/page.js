'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ProjectCard, AddProjectForm, ConfirmModal, EditProjectModal, CompleteProjectModal, MentorSettingsModal } from '@/components'
import { useAuth } from '@/context/AuthContext'

export default function MentorDashboard() {
  const { logout } = useAuth()
  // State for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Galactic Defense Protocol',
      description: 'The network is under attack from quantum anomalies. We need a robust firewall to protect the core. A Python-based intrusion detection system using ML algorithms is needed.',
      repoLink: 'https://github.com/vsoc/galactic-defense',
      commsLink: 'https://discord.gg/example',
      isActive: true
    }
  ])

  // State for editing
  const [editingProject, setEditingProject] = useState(null)
  
  // State for completion
  /* Existing state definitions */
  const [completeModal, setCompleteModal] = useState({
    isOpen: false,
    projectId: null
  })

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    projectId: null
  })

  // State for settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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

  const handleCompleteClick = (id) => {
    setCompleteModal({ isOpen: true, projectId: id })
  }

  const handleConfirmCompletion = (proofData) => {
    setProjects(prev => prev.map(p => 
      p.id === completeModal.projectId 
        ? { ...p, isCompleted: true, isActive: false, ...proofData } 
        : p
    ))
    setCompleteModal({ isOpen: false, projectId: null })
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-20 selection:bg-cyan-500/30">
      {/* Background Elements - Professional/Cyberpunk */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Modals */}
      <MentorSettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

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
        variant="professional"
      />

      <CompleteProjectModal
        isOpen={completeModal.isOpen}
        onClose={() => setCompleteModal({ isOpen: false, projectId: null })}
        onComplete={handleConfirmCompletion}
        variant="professional"
      />

      <div className="max-w-7xl mx-auto px-4 pt-32 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
      
       {/* Left Column: Add Project Form (Cleaned) */}
        <div className="lg:col-span-1 animate-slide-right">
           <div className="mb-6 flex justify-end">
             <button
                onClick={() => setIsSettingsOpen(true)}
                className="text-xs font-bold text-cyan-400 hover:text-white border border-cyan-800 hover:border-cyan-400 px-3 py-1 rounded transition-colors uppercase tracking-wider"
             >
                Edit Profile
             </button>
           </div>
           
           <AddProjectForm 
             onAddProject={handleAddProject} 
             variant="professional"
           />
        </div>

        {/* Right Column: Project List */}
        <div className="lg:col-span-2 animate-slide-left">
          <div className="bg-gray-900/60 backdrop-blur-md border border-white/10 p-6 rounded-xl mb-6 shadow-xl">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="text-cyan-400">❖</span> Active Projects
                </h2>
                <div className="text-xs font-bold text-gray-500 bg-black/30 px-3 py-1 rounded-full border border-white/5">
                  {filteredProjects.length} DEPLOYED
                </div>
             </div>
             
             {/* Search Bar - Professional */}
             <div className="relative mb-2">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Seach projects by title..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg text-white text-sm px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-colors placeholder-gray-600"
                />
                <div className="absolute right-3 top-3 text-gray-500 text-sm">🔍</div>
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
                  onComplete={handleCompleteClick}
                  variant="professional"
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl bg-white/5">
                <div className="text-4xl mb-4 grayscale opacity-30">
                  {searchQuery ? '🔭' : '⚡'}
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {searchQuery ? 'No matching projects found' : 'No active projects deployed'}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}

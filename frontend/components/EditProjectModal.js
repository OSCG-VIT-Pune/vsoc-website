'use client'

import React, { useState, useEffect } from 'react'
import ArcadeInput from './ArcadeInput'

export default function EditProjectModal({ 
  isOpen, 
  onClose, 
  project, 
  onUpdate 
}) {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    studentsRequired: '',
    problemStatement: '',
    expectedSolution: '',
    repoLink: '',
    commsLink: ''
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (project) {
        setFormData({
            title: project.title,
            domain: project.domain,
            studentsRequired: project.studentsRequired,
            problemStatement: project.problemStatement,
            expectedSolution: project.expectedSolution,
            repoLink: project.repoLink,
            commsLink: project.commsLink
        })
    }
  }, [project])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'TITLE REQUIRED'
    if (!formData.domain.trim()) newErrors.domain = 'DOMAIN REQUIRED'
    if (!formData.studentsRequired.trim()) newErrors.studentsRequired = 'COUNT REQUIRED'
    if (!formData.problemStatement.trim()) newErrors.problemStatement = 'PROBLEM REQUIRED'
    if (!formData.expectedSolution.trim()) newErrors.expectedSolution = 'SOLUTION REQUIRED'
    if (!formData.repoLink.trim()) newErrors.repoLink = 'REPO LINK REQUIRED'
    if (!formData.commsLink.trim()) newErrors.commsLink = 'COMMS LINK REQUIRED'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onUpdate({ ...project, ...formData })
      onClose()
      alert('CARTRIDGE UPDATED! (Project Saved)')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content - Scrollable if too tall */}
      <div className="relative z-10 w-full max-w-2xl bg-gray-900 border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] animate-pixel-pop max-h-[90vh] flex flex-col">
        
        {/* Header - Fixed */}
        <div className="p-6 border-b-2 border-gray-800 bg-gray-900 z-10">
          <div className="flex items-center justify-between">
             <h3 className="font-pixel text-2xl text-yellow-400 pixel-text">
               EDIT PROJECT DATA
             </h3>
             <button onClick={onClose} className="text-gray-500 hover:text-white font-pixel text-xl">X</button>
          </div>
        </div>
        
        {/* Form - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ArcadeInput 
                    label="PROJECT TITLE" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required
                    error={errors.title}
                    />
                    <ArcadeInput 
                    label="DOMAIN" 
                    name="domain" 
                    value={formData.domain} 
                    onChange={handleChange} 
                    required
                    error={errors.domain}
                    />
                </div>

                <ArcadeInput 
                    label="REQUIRED PLAYERS (STUDENTS)" 
                    name="studentsRequired" 
                    value={formData.studentsRequired} 
                    onChange={handleChange} 
                    type="text"
                    required
                    error={errors.studentsRequired}
                />

                <div className="mb-4">
                    <label className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text">
                    PROBLEM STATEMENT <span className="text-red-400">*</span>
                    </label>
                    <textarea
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white focus:border-cyan-400 outline-none transition-all h-24"
                    />
                    {errors.problemStatement && <div className="text-red-400 font-pixel text-xs mt-1">⚠ {errors.problemStatement}</div>}
                </div>

                <div className="mb-4">
                    <label className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text">
                    EXPECTED SOLUTION <span className="text-red-400">*</span>
                    </label>
                    <textarea
                    name="expectedSolution"
                    value={formData.expectedSolution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white focus:border-cyan-400 outline-none transition-all h-24"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ArcadeInput 
                    label="GITHUB REPO LINK" 
                    name="repoLink" 
                    value={formData.repoLink} 
                    onChange={handleChange} 
                    required
                    error={errors.repoLink}
                    />
                    <ArcadeInput 
                    label="COMMS CHANNEL" 
                    name="commsLink" 
                    value={formData.commsLink} 
                    onChange={handleChange} 
                    required
                    error={errors.commsLink}
                    />
                </div>
            </form>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t-2 border-gray-800 bg-gray-900 z-10">
            <div className="flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 py-4 bg-gray-800 border-4 border-gray-600 text-gray-400 font-pixel hover:bg-gray-700 hover:text-white hover:border-white transition-all"
                >
                    CANCEL
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-4 bg-yellow-900 border-4 border-yellow-500 text-white font-pixel hover:bg-yellow-800 hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                >
                    UPDATE PROJECT
                </button>
            </div>
        </div>

      </div>
    </div>
  )
}

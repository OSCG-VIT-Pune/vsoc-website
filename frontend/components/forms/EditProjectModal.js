'use client'

import React, { useState, useEffect } from 'react'
import ArcadeInput from '../ui/ArcadeInput'

export default function EditProjectModal({ 
  isOpen, 
  onClose, 
  project, 
  onUpdate,
  variant = 'arcade' // 'arcade' | 'professional'
}) {
  const isProfessional = variant === 'professional'

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    repoLink: '',
    commsLink: ''
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (project) {
        setFormData({
            title: project.title,
            description: project.description,
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
    if (!formData.description.trim()) newErrors.description = 'DESCRIPTION REQUIRED'
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
      alert('SUCCESS: PROJECT DATASHEET UPDATED')
    }
  }

  // Styles
  const containerClass = isProfessional
    ? "relative z-10 w-full max-w-2xl bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col max-h-[90vh]"
    : "relative z-10 w-full max-w-2xl bg-gray-900 border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] animate-pixel-pop max-h-[90vh] flex flex-col"

  const headerClass = isProfessional
    ? "p-6 border-b border-white/10 bg-white/5"
    : "p-6 border-b-2 border-gray-800 bg-gray-900 z-10"
    
  const titleClass = isProfessional
    ? "text-xl font-bold text-white tracking-tight"
    : "font-pixel text-2xl text-yellow-400 pixel-text"

  const labelClass = isProfessional
    ? "block text-xs font-bold text-gray-400 mb-2 font-sans tracking-wide"
    : "block font-pixel text-sm text-cyan-400 mb-2 pixel-text"

  const textareaClass = isProfessional
    ? "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500/50 focus:bg-white/10 outline-none transition-all h-24 text-sm font-sans placeholder-gray-500"
    : "w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white focus:border-cyan-400 outline-none transition-all h-24"

  const footerClass = isProfessional
    ? "p-6 border-t border-white/10 bg-white/5"
    : "p-6 border-t-2 border-gray-800 bg-gray-900 z-10"

  const buttonCancelClass = isProfessional
    ? "flex-1 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-bold text-sm hover:bg-white/10 transition-all"
    : "flex-1 py-4 bg-gray-800 border-4 border-gray-600 text-gray-400 font-pixel hover:bg-gray-700 hover:text-white hover:border-white transition-all"

  const buttonSubmitClass = isProfessional
    ? "flex-1 py-3 bg-cyan-600 border border-cyan-500 rounded-lg text-white font-bold text-sm hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
    : "flex-1 py-4 bg-yellow-900 border-4 border-yellow-500 text-white font-pixel hover:bg-yellow-800 hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 ${isProfessional ? 'bg-black/60 backdrop-blur-md' : 'bg-black/80 backdrop-blur-sm'} animate-fade-in`}
        onClick={onClose}
      ></div>

      {/* Modal Content - Scrollable if too tall */}
      <div className={containerClass}>
        
        {/* Header - Fixed */}
        <div className={headerClass}>
          <div className="flex items-center justify-between">
             <h3 className={titleClass}>
               {isProfessional ? "Edit Project Details" : "EDIT PROJECT DATA"}
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
                    variant={variant}
                    />
                </div>

                <div className="mb-4">
                    <label className={labelClass}>
                    PROJECT DESCRIPTION <span className="text-red-400">*</span>
                    </label>
                    <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={textareaClass}
                    />
                    {errors.description && <div className="text-red-400 font-pixel text-xs mt-1">⚠ {errors.description}</div>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ArcadeInput 
                    label="GITHUB REPO LINK" 
                    name="repoLink" 
                    value={formData.repoLink} 
                    onChange={handleChange} 
                    required
                    error={errors.repoLink}
                    variant={variant}
                    />
                    <ArcadeInput 
                    label="COMMS CHANNEL" 
                    name="commsLink" 
                    value={formData.commsLink} 
                    onChange={handleChange} 
                    required
                    error={errors.commsLink}
                    variant={variant}
                    />
                </div>
            </form>
        </div>

        {/* Footer - Fixed */}
        <div className={footerClass}>
            <div className="flex gap-4">
                <button
                    onClick={onClose}
                    className={buttonCancelClass}
                >
                    CANCEL
                </button>
                <button
                    onClick={handleSubmit}
                    className={buttonSubmitClass}
                >
                    {isProfessional ? "SAVE CHANGES" : "UPDATE PROJECT"}
                </button>
            </div>
        </div>

      </div>
    </div>
  )
}

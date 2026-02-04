'use client'

import { useState } from 'react'
import ArcadeInput from '../ui/ArcadeInput'

export default function AddProjectForm({ onAddProject, variant = 'arcade' }) {
  const isProfessional = variant === 'professional'

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    repoLink: '',
    commsLink: ''
  })

  const [errors, setErrors] = useState({})

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
      onAddProject(formData)
      // Reset form
      setFormData({
        title: '',
        description: '',
        repoLink: '',
        commsLink: ''
      })
      alert('SUCCESS: PROJECT INITIALIZED')
    }
  }

  const containerClass = isProfessional
    ? "bg-gray-900/60 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden"
    : "border-4 border-magenta-800 bg-gradient-to-br from-gray-900 to-black p-8 rounded-none"

  const labelClass = isProfessional
    ? "block text-xs font-bold text-gray-400 mb-2 font-sans tracking-wide"
    : "block font-pixel text-sm text-cyan-400 mb-2 pixel-text"

  const textareaClass = isProfessional
    ? "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500/50 focus:bg-white/10 outline-none transition-all h-32 text-sm font-sans placeholder-gray-500"
    : "w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/50 outline-none transition-all h-32"

  const buttonClass = isProfessional
    ? "w-full py-3 mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-bold text-sm tracking-widest hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/20 transition-all transform hover:-translate-y-0.5"
    : "w-full py-4 mt-4 bg-gradient-to-r from-magenta-700 to-magenta-900 border-4 border-magenta-500 text-white font-pixel text-lg hover:from-magenta-600 hover:to-magenta-800 hover:border-magenta-400 transition-all shadow-lg hover:shadow-magenta-500/40"

  return (
    <form onSubmit={handleSubmit} className={containerClass}>
      {isProfessional && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      )}
      
      <div className="text-center mb-8">
         <h2 className={isProfessional 
            ? "text-2xl font-bold text-white mb-2 tracking-tight" 
            : "font-pixel text-2xl text-magenta-400 mb-2"
         }>
           {isProfessional ? "Initialize New Project" : "INSERT NEW PROJECT"}
         </h2>
         <p className="text-gray-400 text-sm">
           {isProfessional ? "Define parameters below to launch a new workspace." : "Define the parameters for a new project"}
         </p>
      </div>

      <div className="mb-6">
        <ArcadeInput 
          label="PROJECT TITLE" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="e.g. AI Sentinel"
          required
          error={errors.title}
          variant={variant}
        />
      </div>

      <div className="mb-6">
        <label className={labelClass}>
          PROJECT DESCRIPTION <span className="text-red-400">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={textareaClass}
          placeholder="Describe the project..."
        />
        {errors.description && <div className="text-red-400 text-xs mt-1 font-bold">⚠ {errors.description}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArcadeInput 
          label="GITHUB REPO" 
          name="repoLink" 
          value={formData.repoLink} 
          onChange={handleChange} 
          placeholder="https://github.com/..."
          required
          error={errors.repoLink}
          variant={variant}
        />
        <ArcadeInput 
          label="COMMUNICATION" 
          name="commsLink" 
          value={formData.commsLink} 
          onChange={handleChange} 
          placeholder="WhatsApp Group / Discord Channel Link"
          required
          error={errors.commsLink}
          variant={variant}
        />
      </div>

      <button type="submit" className={buttonClass}>
        {isProfessional ? "+ DEPLOY PROJECT" : "+ INITIALIZE PROJECT"}
      </button>

    </form>
  )
}

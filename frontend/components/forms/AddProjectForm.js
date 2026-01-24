'use client'

import { useState } from 'react'
import ArcadeInput from '../ui/ArcadeInput'

export default function AddProjectForm({ onAddProject }) {
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
      onAddProject(formData)
      // Reset form
      setFormData({
        title: '',
        domain: '',
        studentsRequired: '',
        problemStatement: '',
        expectedSolution: '',
        repoLink: '',
        commsLink: ''
      })
      alert('NEW CARTRIDGE LOADED! (Project Added)')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-4 border-magenta-800 bg-gradient-to-br from-gray-900 to-black p-8 rounded-none">
      <div className="text-center mb-8">
         <h2 className="font-pixel text-2xl text-magenta-400 mb-2">INSERT NEW PROJECT</h2>
         <p className="text-gray-400 text-sm">Define the parameters for a new project</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArcadeInput 
          label="PROJECT TITLE" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="e.g. AI Sentinel"
          required
          error={errors.title}
        />
        <ArcadeInput 
          label="DOMAIN" 
          name="domain" 
          value={formData.domain} 
          onChange={handleChange} 
          placeholder="e.g. Machine Learning"
          required
          error={errors.domain}
        />
      </div>

      <ArcadeInput 
        label="REQUIRED PLAYERS (STUDENTS)" 
        name="studentsRequired" 
        value={formData.studentsRequired} 
        onChange={handleChange} 
        placeholder="e.g. 2-4" 
        type="text"
        required
        error={errors.studentsRequired}
      />

      <div className="mb-6">
        <label className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text">
          PROBLEM STATEMENT <span className="text-red-400">*</span>
        </label>
        <textarea
          name="problemStatement"
          value={formData.problemStatement}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/50 outline-none transition-all h-32"
          placeholder="Describe the challenge..."
        />
        {errors.problemStatement && <div className="text-red-400 font-pixel text-xs mt-1">⚠ {errors.problemStatement}</div>}
      </div>

      <div className="mb-6">
        <label className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text">
          EXPECTED SOLUTION <span className="text-red-400">*</span>
        </label>
        <textarea
          name="expectedSolution"
          value={formData.expectedSolution}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/50 outline-none transition-all h-32"
          placeholder="Describe the victory condition..."
        />
        {errors.expectedSolution && <div className="text-red-400 font-pixel text-xs mt-1">⚠ {errors.expectedSolution}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArcadeInput 
          label="GITHUB REPO LINK" 
          name="repoLink" 
          value={formData.repoLink} 
          onChange={handleChange} 
          placeholder="https://github.com/..."
          required
          error={errors.repoLink}
        />
        <ArcadeInput 
          label="COMMS CHANNEL (SQUAD LINK)" 
          name="commsLink" 
          value={formData.commsLink} 
          onChange={handleChange} 
          placeholder="WhatsApp Group / Discord Link"
          required
          error={errors.commsLink}
        />
      </div>

      <button 
        type="submit" 
        className="w-full py-4 mt-4 bg-gradient-to-r from-magenta-700 to-magenta-900 border-4 border-magenta-500 text-white font-pixel text-lg hover:from-magenta-600 hover:to-magenta-800 hover:border-magenta-400 transition-all shadow-lg hover:shadow-magenta-500/40"
      >
        + INITIALIZE PROJECT
      </button>

    </form>
  )
}

'use client'

import React, { useState } from 'react'
import { ArcadeInput } from '@/components'

/**
 * CompleteProjectModal Component
 * Modal for mentors to submit proof of project completion
 */
export default function CompleteProjectModal({ isOpen, onClose, onComplete, variant = 'arcade' }) {
  const isProfessional = variant === 'professional'

  const [formData, setFormData] = useState({
    youtubeLink: '',
    githubLink: '',
    deploymentLink: ''
  })

  // Mock validation - effectively just checks if required fields are filled
  const isValid = formData.youtubeLink && formData.githubLink

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      onComplete(formData)
      // Reset form
      setFormData({
        youtubeLink: '',
        githubLink: '',
        deploymentLink: ''
      })
    }
  }

  // Styles
  const containerClass = isProfessional
    ? "relative w-full max-w-2xl bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col"
    : "relative w-full max-w-2xl bg-gray-900 border-4 border-yellow-500 shadow-2xl shadow-yellow-500/20 p-1"

  const headerClass = isProfessional
    ? "bg-white/5 p-6 border-b border-white/10 flex justify-between items-center"
    : "bg-yellow-900/30 p-4 border-b-2 border-yellow-700 flex justify-between items-center"

  const titleClass = isProfessional
    ? "text-lg font-bold text-white tracking-tight flex items-center gap-2"
    : "font-pixel text-xl text-yellow-400 pixel-text flex items-center gap-2"

  const buttonCancelClass = isProfessional
    ? "flex-1 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-bold text-sm hover:bg-white/10 transition-all cursor-pointer"
    : "flex-1 py-3 border-2 border-gray-600 text-gray-400 font-pixel hover:bg-gray-800 hover:text-gray-200 transition-colors"

  const buttonSubmitClass = isProfessional
    ? `flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
        isValid 
          ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-500 hover:to-orange-500 shadow-lg' 
          : 'bg-white/10 text-gray-500 cursor-not-allowed'
      }`
    : `flex-1 py-3 border-2 font-pixel transition-all ${
        isValid 
          ? 'border-yellow-500 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-500 hover:text-black animate-pulse-glow' 
          : 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed'
      }`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 ${isProfessional ? 'bg-black/60 backdrop-blur-md' : 'bg-black/80 backdrop-blur-sm'}`}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={containerClass}>
        {/* Header Bar */}
        <div className={headerClass}>
          <h2 className={titleClass}>
            <span>{isProfessional ? '🏆' : '🏆'}</span>
            {isProfessional ? 'Mission Complete' : 'MISSION DEBRIEF'}
          </h2>
          <button 
            onClick={onClose}
            className={isProfessional ? "text-gray-400 hover:text-white" : "text-yellow-500 hover:text-yellow-300 font-bold"}
          >
            {isProfessional ? '✕' : '[X]'}
          </button>
        </div>

        <div className={isProfessional ? "p-6 md:p-8 space-y-6" : "p-6 md:p-8"}>
          <p className={isProfessional ? "text-gray-400 text-sm leading-relaxed" : "text-gray-300 mb-6 font-mono text-sm"}>
            Please provide mission logs to verify project completion. This data will be archived in the Hall of Fame.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ArcadeInput
              label={isProfessional ? "YOUTUBE DEMO (REQUIRED)" : "YOUTUBE DEMO LINK (REQUIRED)"}
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.youtubeLink}
              onChange={(e) => setFormData({...formData, youtubeLink: e.target.value})}
              required
              variant={variant}
            />

            <ArcadeInput
              label={isProfessional ? "GITHUB REPO (REQUIRED)" : "GITHUB REPOSITORY (REQUIRED)"}
              type="url"
              placeholder="https://github.com/..."
              value={formData.githubLink}
              onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
              required
              variant={variant}
            />

            <ArcadeInput
              label={isProfessional ? "DEPLOYMENT URL (OPTIONAL)" : "DEPLOYMENT URL (OPTIONAL)"}
              type="url"
              placeholder="https://my-app.vercel.app"
              value={formData.deploymentLink}
              onChange={(e) => setFormData({...formData, deploymentLink: e.target.value})}
              variant={variant}
            />

            <div className={isProfessional ? "flex gap-4 pt-4 mt-2" : "flex gap-4 pt-4 mt-8 border-t border-gray-700"}>
              <button
                type="button"
                onClick={onClose}
                className={buttonCancelClass}
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={buttonSubmitClass}
              >
                {isProfessional ? "CONFIRM" : "CONFIRM COMPLETION"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

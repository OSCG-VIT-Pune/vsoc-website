'use client'

import React, { useState } from 'react'
import { ArcadeInput } from '@/components'

/**
 * CompleteProjectModal Component
 * Modal for mentors to submit proof of project completion
 */
export default function CompleteProjectModal({ isOpen, onClose, onComplete }) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-gray-900 border-4 border-yellow-500 shadow-2xl shadow-yellow-500/20 p-1">
        {/* Header Bar */}
        <div className="bg-yellow-900/30 p-4 border-b-2 border-yellow-700 flex justify-between items-center">
          <h2 className="font-pixel text-xl text-yellow-400 pixel-text flex items-center gap-2">
            <span>🏆</span> MISSION DEBRIEF
          </h2>
          <button 
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 font-bold"
          >
            [X]
          </button>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-gray-300 mb-6 font-mono text-sm">
            Please provide mission logs to verify project completion. This data will be archived in the Hall of Fame.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ArcadeInput
              label="YOUTUBE DEMO LINK (REQUIRED)"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.youtubeLink}
              onChange={(e) => setFormData({...formData, youtubeLink: e.target.value})}
              required
            />

            <ArcadeInput
              label="GITHUB REPOSITORY (REQUIRED)"
              type="url"
              placeholder="https://github.com/..."
              value={formData.githubLink}
              onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
              required
            />

            <ArcadeInput
              label="DEPLOYMENT URL (OPTIONAL)"
              type="url"
              placeholder="https://my-app.vercel.app"
              value={formData.deploymentLink}
              onChange={(e) => setFormData({...formData, deploymentLink: e.target.value})}
            />

            <div className="flex gap-4 pt-4 mt-8 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border-2 border-gray-600 text-gray-400 font-pixel hover:bg-gray-800 hover:text-gray-200 transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`flex-1 py-3 border-2 font-pixel transition-all ${
                  isValid 
                    ? 'border-yellow-500 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-500 hover:text-black animate-pulse-glow' 
                    : 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                CONFIRM COMPLETION
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

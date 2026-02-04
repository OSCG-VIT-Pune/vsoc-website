'use client'

import { useState, useEffect } from 'react'
import ArcadeInput from '../ui/ArcadeInput'
import { useAuth } from '@/context/AuthContext'

export default function MentorSettingsModal({ isOpen, onClose }) {
  const { user, loginUserDirectly } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    projects: '',
    github: '',
    linkedin: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        expertise: user.expertise || '',
        projects: user.projects || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        bio: user.bio || ''
      })
    }
  }, [user, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const updatedUser = { ...user, ...formData }
      
      // Update local storage
      localStorage.setItem(`vsoc_user_${user.email}`, JSON.stringify(updatedUser))
      localStorage.setItem('vsoc_active_user_email', user.email)
      
      // Update context
      loginUserDirectly(updatedUser)
      
      setLoading(false)
      onClose()
      alert('Mentor Profile updated successfully.')
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-gray-900 border border-cyan-500/30 rounded-xl p-8 shadow-2xl animate-scale-up">
        
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <h2 className="font-sans text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">❖</span> Edit Profile
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArcadeInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              variant="professional"
            />
            
            <div className="mb-6 opacity-60 pointer-events-none">
              <label className="block font-sans text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
                Email Address (Read Only)
              </label>
              <div className="bg-black/30 border border-gray-700 rounded-sm p-3 text-gray-400 font-sans">
                {formData.email}
              </div>
            </div>

            <ArcadeInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXXXXXXX"
              required
              variant="professional"
            />

            <ArcadeInput
              label="Expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="Web Dev, AI/ML..."
              required
              variant="professional"
            />
          </div>

          <ArcadeInput
            label="Projects Maintained"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="List your projects..."
            variant="professional"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArcadeInput
              label="GitHub Username"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="@username"
              required
              variant="professional"
            />
            <ArcadeInput
              label="LinkedIn (Optional)"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Profile URL"
              variant="professional"
            />
          </div>

          <div className="mb-6">
            <label className="block font-sans text-xs font-bold tracking-widest text-cyan-400/80 mb-2 uppercase">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={200}
              className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-cyan-700/50 rounded-sm text-white font-sans focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all duration-300"
            />
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white font-sans font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-sans font-bold tracking-wider rounded-md transition-all duration-300 shadow-lg shadow-cyan-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

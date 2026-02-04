'use client'

import { useState, useEffect } from 'react'
import ArcadeInput from '../ui/ArcadeInput'
import { useAuth } from '@/context/AuthContext'

export default function StudentSettingsModal({ isOpen, onClose }) {
  const { user, loginUserDirectly } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    branch: '',
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
        college: user.college || '',
        year: user.year || '',
        branch: user.branch || '',
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
      alert('PROFILE UPDATED SUCCESSFULLY')
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border-4 border-cyan-600 bg-black p-6 md:p-8 animate-scale-up shadow-[0_0_50px_rgba(8,145,178,0.3)]">
        
        <div className="flex justify-between items-center mb-8 border-b-4 border-gray-800 pb-4">
          <h2 className="font-pixel text-2xl text-cyan-400 pixel-text">EDIT PROFILE</h2>
          <button 
            onClick={onClose}
            className="text-red-500 hover:text-red-400 font-pixel text-xl transition-colors"
          >
            [X]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ArcadeInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            
            <div className="mb-6 opacity-60 pointer-events-none">
              <label className="block font-pixel text-sm text-gray-500 mb-2 pixel-text">
                Email Address (Read Only)
              </label>
              <div className="bg-gray-900 border-4 border-gray-700 p-3 text-gray-400 font-sans">
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
            />

            <ArcadeInput
              label="College"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Your College"
              required
            />

            <ArcadeInput
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Current Year"
              required
            />

            <ArcadeInput
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Your Branch"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ArcadeInput
              label="GitHub Username"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="@username"
              required
            />
            <ArcadeInput
              label="LinkedIn (Optional)"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Profile URL"
            />
          </div>

          <div className="mb-6">
            <label className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={200}
              className="w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 text-white font-sans focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 rounded-none"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t-4 border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-800 text-gray-400 font-pixel hover:bg-gray-700 hover:text-white border-4 border-gray-600 transition-all duration-300"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-800 font-pixel text-white border-4 border-green-400 arcade-btn hover:border-green-300 hover:from-green-500 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

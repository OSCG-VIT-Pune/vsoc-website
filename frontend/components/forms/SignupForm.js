'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ArcadeInput from '../ui/ArcadeInput'
import SocialButton from '../ui/SocialButton'

export default function SignupForm({ userType = 'student' }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    branch: '',
    github: '',
    linkedin: '',
    expertise: '',
    projects: '',
    bio: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [progress, setProgress] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const isMentor = userType === 'mentor'

  // Calculate form progress
  const calculateProgress = () => {
    if (step === 1) return 20 // Arbitrary progress for step 1

    const requiredFields = isMentor 
      ? ['name', 'email', 'phone', 'expertise', 'github', 'password']
      : ['name', 'email', 'phone', 'college', 'year', 'branch', 'github', 'password']
    
    const filledFields = requiredFields.filter(field => formData[field]?.trim())
    // Scale the remaining 80% based on form completion
    return 20 + Math.round((filledFields.length / requiredFields.length) * 80)
  }

  // Update progress when form data changes
  useEffect(() => {
    setProgress(calculateProgress())
  }, [formData, step])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Common validations
    if (!formData.name.trim()) newErrors.name = 'NAME REQUIRED'
    if (!formData.email.trim()) newErrors.email = 'EMAIL REQUIRED'
    else if (!formData.email.endsWith('@vit.edu')) newErrors.email = 'ONLY VIT.EDU ALLOWED'
    if (!formData.password.trim()) newErrors.password = 'PASSWORD REQUIRED'
    if (!formData.phone.trim()) newErrors.phone = 'PHONE REQUIRED'
    if (!formData.github.trim()) newErrors.github = 'GITHUB REQUIRED'

    // Mentor-specific validations
    if (isMentor) {
      if (!formData.expertise.trim()) newErrors.expertise = 'EXPERTISE REQUIRED'
    } else {
      // Student-specific validations
      if (!formData.college.trim()) newErrors.college = 'COLLEGE REQUIRED'
      if (!formData.year.trim()) newErrors.year = 'YEAR REQUIRED'
      if (!formData.branch.trim()) newErrors.branch = 'BRANCH REQUIRED'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGitHubRegister = () => {
    // Simulate GitHub OAuth flow
    setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Simulate backend registration by storing in localStorage
      const userData = {
        ...formData,
        userType
      }
      
      // key: vsoc_user_email@vit.edu
      localStorage.setItem(`vsoc_user_${formData.email}`, JSON.stringify(userData))
      
      console.log('Form submitted:', formData)
      setSubmitted(true)
      
      // Simulate submission & redirect
      setTimeout(() => {
        alert('🎮 REGISTRATION COMPLETE! REDIRECTING TO LOGIN...')
        router.push('/login') 
      }, 1000)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-pixel-pop">
        <div className="border-8 border-green-500 bg-gradient-to-br from-green-900/40 to-black p-12 rounded-none">
          <div className="text-8xl mb-6 animate-float">🎮</div>
          <h2 className="font-pixel text-3xl text-green-400 mb-6 pixel-text animate-pulse-glow">
            REGISTRATION COMPLETE!
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Welcome to VSoC, {formData.name}! Your {userType} profile has been created.
          </p>
          <div className="font-pixel text-sm text-yellow-400">
            LOADING GAME... PLEASE WAIT
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-cyan-300 font-pixel">REGISTRATION PROGRESS</span>
          <span className="text-yellow-300 font-pixel">{progress}%</span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Form Title */}
      <div className="mb-8 text-center">
        <h2 className="font-pixel text-2xl md:text-3xl text-cyan-400 mb-2 pixel-text">
          {isMentor ? '👨‍🏫 MENTOR' : '🎓 STUDENT'} REGISTRATION
        </h2>
        <p className="text-gray-400">
          {step === 1 ? 'Step 1: Connect with GitHub' : 'Step 2: Complete Profile'}
        </p>
      </div>

      {step === 1 ? (
        <div className="animate-slide-up">
           <div className="border-4 border-cyan-800 bg-gradient-to-br from-gray-900 to-black p-8 rounded-none mb-6 text-center">
             <div className="mb-8 animate-float">
               <span className="text-6xl">🐙</span>
             </div>
             <h3 className="font-pixel text-xl text-white mb-6 pixel-text">
               START WITH GITHUB
             </h3>
             <p className="text-gray-400 mb-8">
               Connect your GitHub account to auto-fill your profile and verify your developer status.
             </p>
             <button
               onClick={handleGitHubRegister}
               className="w-full px-8 py-4 bg-[#24292e] text-white font-pixel text-lg border-4 border-gray-500 hover:border-white hover:bg-black transition-all duration-300 flex items-center justify-center gap-3"
             >
               <span>REGISTER WITH GITHUB</span>
             </button>
             <div className="mt-6 text-xs text-gray-500">
               * We'll only access your public profile data
             </div>
           </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="animate-slide-left">
          {/* Form Fields */}
          <div className="border-4 border-cyan-800 bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-none mb-6">
            {/* Common Fields */}
            <ArcadeInput
              label="PLAYER NAME"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              maxLength={50}
              error={errors.name}
            />

            <ArcadeInput
              label="EMAIL ADDRESS (only vit.edu)"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              error={errors.email}
            />

            <ArcadeInput
              label="PASSWORD"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter secure password"
              required
              error={errors.password}
            />

            <ArcadeInput
              label="PHONE NUMBER"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXXXXXXX"
              required
              maxLength={15}
              error={errors.phone}
            />

            {/* Student-specific fields */}
            {!isMentor && (
              <>
                <ArcadeInput
                  label="COLLEGE/UNIVERSITY"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Vishwakarma Institute of Technology"
                  required
                  error={errors.college}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ArcadeInput
                    label="YEAR"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2nd Year"
                    required
                    error={errors.year}
                  />

                  <ArcadeInput
                    label="BRANCH"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="Computer Engineering"
                    required
                    error={errors.branch}
                  />
                </div>
              </>
            )}

            {/* Mentor-specific fields */}
            {isMentor && (
              <>
                <ArcadeInput
                  label="EXPERTISE/DOMAINS"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="Web Dev, AI/ML, Cloud Computing"
                  required
                  error={errors.expertise}
                />

                <ArcadeInput
                  label="PROJECTS MAINTAINED"
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  placeholder="List your open source projects"
                />
              </>
            )}

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArcadeInput
                label="GITHUB USERNAME"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="@yourusername"
                required
                error={errors.github}
              />

              <ArcadeInput
                label="LINKEDIN (OPTIONAL)"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text">
                BIO (OPTIONAL)
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder={isMentor ? "Tell us about your experience..." : "Tell us about yourself..."}
                maxLength={200}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white font-sans focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/50 transition-all duration-300"
              />
              <div className="mt-1 text-right font-pixel text-xs text-gray-500">
                {formData.bio.length}/200
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
             <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-5 bg-gray-800 text-gray-400 font-pixel component-btn hover:bg-gray-700 hover:text-white border-4 border-gray-600 transition-all duration-300"
            >
              ← BACK
            </button>
            <button
              type="submit"
              className="flex-1 px-10 py-5 bg-gradient-to-r from-green-600 to-green-800 font-pixel text-lg rounded-none border-4 border-green-400 arcade-btn hover:border-green-300 hover:from-green-500 hover:to-green-700 transition-all duration-300"
            >
              🎮 COMPLETE REGISTRATION
            </button>
          </div>

          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-6 p-4 border-4 border-red-500 bg-red-900/20 rounded-none animate-shake">
              <div className="font-pixel text-sm text-red-400 text-center">
                ⚠ PLEASE FIX {Object.keys(errors).length} ERROR(S) ABOVE
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

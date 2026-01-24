'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArcadeInput } from '@/components'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.email.endsWith('@vit.edu')) {
      setErrors({ email: 'Only @vit.edu emails are allowed' })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Use AuthContext to login
      const user = login(formData.email)
      
      if (user) {
        if (user.password === formData.password) {
          // Success!
          setIsLoading(false)
          
          if (user.userType === 'mentor') {
             alert('ACCESS GRANTED: MENTOR')
             router.push('/mentor-dashboard')
          } else {
             alert('ACCESS GRANTED: STUDENT')
             router.push('/student-dashboard') 
          }
          return
        }
      }
      
      // Verification failed
      setIsLoading(false)
      setErrors({ email: 'INVALID CREDENTIALS' })
      // Shake effect
      const card = document.querySelector('.bg-gray-900')
      if (card) {
        card.classList.add('animate-shake')
        setTimeout(() => card.classList.remove('animate-shake'), 500)
      }
      
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             backgroundPosition: 'center'
           }}>
      </div>
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* CRT Frame Effect */}
        <div className="bg-gray-900 border-4 border-cyan-600 p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] relative group">
          
          {/* Neon Corner Accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-cyan-400"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-cyan-400"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-cyan-400"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-cyan-400"></div>

          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6 text-xs font-pixel text-gray-500 hover:text-cyan-400 transition-colors">
              ← BACK TO ARCADE
            </Link>
            <h1 className="font-pixel text-4xl text-white mb-2 pixel-text animate-pulse-glow">
              PLAYER LOGIN
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <ArcadeInput 
              label="EMAIL ADDRESS (only vit.edu)"
              name="email"
              type="email"
              placeholder="player1@vit.edu"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <ArcadeInput 
              label="PASSWORD"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-cyan-700 to-cyan-900 border-2 border-cyan-500 rounded-none font-pixel text-white text-lg hover:from-cyan-600 hover:to-cyan-800 hover:border-cyan-300 hover:scale-[1.02] transform transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'CONNECTING...' : 'START GAME'}
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="h-0.5 bg-gray-700 flex-1"></div>
            <span className="font-pixel text-gray-500 text-xs">OR USE POWER-UP</span>
            <div className="h-0.5 bg-gray-700 flex-1"></div>
          </div>

          <button 
            type="button"
            className="w-full py-3 bg-[#24292e] hover:bg-[#2f363d] border-2 border-gray-600 rounded-none flex items-center justify-center gap-3 transition-all hover:border-gray-400 group"
          >
            <svg height="24" width="24" viewBox="0 0 16 16" fill="white" className="group-hover:scale-110 transition-transform">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span className="font-sans font-bold text-white tracking-wide">
              Sign in with GitHub
            </span>
          </button>
        </div>
        
        {/* Footer Text */}
        <div className="text-center mt-6 text-gray-500 text-xs font-pixel">
          VSoC 2026 • INSERT CREDENTIALS TO PLAY
        </div>
      </div>
    </main>
  )
}

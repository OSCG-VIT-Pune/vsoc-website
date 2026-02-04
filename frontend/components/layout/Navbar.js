'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide Navbar on Login Page
  if (pathname === '/login') return null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const NavLink = ({ href, children, mobile = false }) => {
    const isActive = pathname === href
    const baseClass = "font-pixel text-sm uppercase transition-colors duration-300 hover:text-cyan-400"
    const activeClass = "text-cyan-400 text-shadow-neon"
    const inactiveClass = "text-gray-300"
    
    return (
      <Link 
        href={href} 
        className={`${baseClass} ${isActive ? activeClass : inactiveClass} ${mobile ? 'block py-2 text-lg' : ''}`}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </Link>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
      scrolled ? 'bg-gray-900/90 backdrop-blur-md border-cyan-900/50 py-3 shadow-lg' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/vit_logo.png" alt="VIT Logo" className="h-8 w-auto" />
            <div className="flex flex-col">
              <span className="font-pixel text-lg text-white leading-none group-hover:text-cyan-400 transition-colors">VSoC</span>
              <span className="font-pixel text-[10px] text-gray-400 leading-none">2026</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!user ? (
              <NavLink href="/">Home</NavLink>
            ) : (
              <NavLink href={user.userType === 'mentor' ? '/mentor-dashboard' : '/student-dashboard'}>
                Dashboard
              </NavLink>
            )}
            
            <NavLink href="/leaderboard">Leaderboard</NavLink>
            <NavLink href="/about">About OSCG</NavLink>
            <NavLink href="/team">Team</NavLink>

            {user && (
              <button 
                onClick={handleLogout}
                className="font-pixel text-sm text-red-400 hover:text-red-300 border border-red-900/50 px-3 py-1 rounded bg-red-900/20 hover:bg-red-900/40 transition-all"
              >
                LOGOUT
              </button>
            )}
            
            {!user && (
               <Link href="/login">
                 <button className="font-pixel text-xs bg-cyan-900/30 border border-cyan-500 text-cyan-400 px-4 py-2 hover:bg-cyan-800/50 hover:scale-105 transition-all">
                   LOGIN
                 </button>
               </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-cyan-400 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-cyan-900/50 transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 space-y-4 flex flex-col items-center">
          {!user ? (
            <NavLink href="/" mobile>Home</NavLink>
          ) : (
            <NavLink href={user.userType === 'mentor' ? '/mentor-dashboard' : '/student-dashboard'} mobile>
              Dashboard
            </NavLink>
          )}
          
          <NavLink href="/leaderboard" mobile>Leaderboard</NavLink>
          <NavLink href="/about" mobile>About OSCG</NavLink>
          <NavLink href="/team" mobile>Team</NavLink>

          {user ? (
            <button 
              onClick={handleLogout}
              className="w-full font-pixel text-red-400 py-2 border-t border-gray-800 mt-2"
            >
              LOGOUT
            </button>
          ) : (
             <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
               <button className="w-full font-pixel text-cyan-400 py-2 border border-cyan-900 bg-cyan-900/20">
                 LOGIN
               </button>
             </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import siteConfig from '@/data/siteConfig'

import { useAuth } from '@/context/AuthContext'

export default function Footer() {
  const { user } = useAuth() || {}

  return (
    <footer className="w-full border-t-4 border-gray-800 bg-black text-center relative z-10 overflow-hidden mt-20">
      {/* Decorative Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
             <div className="flex gap-4 mb-4">
               <img src="/vit_logo.png" alt="VIT Logo" className="h-12 w-auto object-contain" />
               <img src="/oscg_logo.png" alt="OSCG Logo" className="h-12 w-auto object-contain pixelated" />
             </div>
             <div className="font-pixel text-xl text-yellow-400 mb-2 tracking-widest text-shadow-glow">
              VIT OSCG
             </div>
             <p className="text-gray-500 text-xs max-w-xs text-center md:text-left">
               {siteConfig.description}
             </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-pixel text-sm text-cyan-400 mb-4 border-b-2 border-gray-800 pb-1">NAVIGATION</h3>
            <nav className="flex flex-col gap-2">
              <Link 
                href={user ? (user.userType === 'mentor' ? '/mentor-dashboard' : '/student-dashboard') : '/'} 
                className="text-gray-400 hover:text-green-400 hover:translate-x-1 transition-all font-pixel text-xs"
              >
                {'>'} {user ? 'DASHBOARD' : 'HOME'}
              </Link>
              <Link href="/leaderboard" className="text-gray-400 hover:text-green-400 hover:translate-x-1 transition-all font-pixel text-xs">
                {'>'} LEADERBOARD
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-green-400 hover:translate-x-1 transition-all font-pixel text-xs">
                {'>'} ABOUT OSCG
              </Link>
              <Link href="/events" className="text-gray-400 hover:text-green-400 hover:translate-x-1 transition-all font-pixel text-xs">
                {'>'} EVENTS
              </Link>
              <Link href="/team" className="text-gray-400 hover:text-green-400 hover:translate-x-1 transition-all font-pixel text-xs">
                {'>'} OSCG TEAM
              </Link>
            </nav>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-pixel text-sm text-magenta-500 mb-4 border-b-2 border-gray-800 pb-1">CONNECT</h3>
            <div className="flex gap-4">
              {Object.entries(siteConfig.socials).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors uppercase text-xs border border-gray-700 p-2 hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-900 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.author}. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
             <span className="animate-pulse text-green-900">INSERT COIN TO CONTINUE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

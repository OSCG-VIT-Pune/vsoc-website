'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef(null)

  const toggleSound = () => {
    setSoundOn(prev => !prev)
  }

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current && typeof window !== 'undefined') {
      audioRef.current = new Audio('/audio/background-music.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }

    // Play/Pause based on state
    if (audioRef.current) {
      if (soundOn) {
        audioRef.current.play().catch(error => {
          console.log('Audio playback prevented:', error)
          // Don't auto-disable sound on error, user might interact later
        })
      } else {
        audioRef.current.pause()
      }
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [soundOn])

  return (
    <SoundContext.Provider value={{ soundOn, toggleSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  return useContext(SoundContext)
}

'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for logged in user on mount
    const checkUser = () => {
      try {
        // We'll look for a specific key that stores the current active session
        const activeUserEmail = localStorage.getItem('vsoc_active_user_email')
        if (activeUserEmail) {
          const userData = localStorage.getItem(`vsoc_user_${activeUserEmail}`)
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error('Auth check user error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const login = (email) => {
    const userData = localStorage.getItem(`vsoc_user_${email}`)
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      // Set active session
      localStorage.setItem('vsoc_active_user_email', email)
      return parsedUser
    }
    return null
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vsoc_active_user_email')
    router.push('/')
  }

  // Helper to sync signup content directly to user state
  const loginUserDirectly = (userData) => {
    setUser(userData)
    localStorage.setItem('vsoc_active_user_email', userData.email)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loginUserDirectly }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

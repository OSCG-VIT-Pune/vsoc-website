'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { CoinInsert, StepCard, ArcadeMapPath, LoadingScreen } from '@/components'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSound } from '@/context/SoundContext'

export default function Home() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { soundOn, toggleSound } = useSound() 
  const coinInsertRef = useRef(null)

  const handleJoinChallenge = () => {
    console.log('handleJoinChallenge triggered')
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Trigger coin insertion
    setTimeout(() => {
      console.log('Timeout fired, checking ref:', coinInsertRef.current)
      if (coinInsertRef.current) {
        coinInsertRef.current.insertCoin()
      } else {
        console.error('Ref is null!')
      }
    }, 1000) // Increased delay to ensure visibility
  }
  
  const [score, setScore] = useState(25800)
  const [xp, setXp] = useState(650)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameLoading, setGameLoading] = useState(true)
  const [bossShake, setBossShake] = useState(false)

  useEffect(() => {
    // Force scroll to top on mount/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Check if we've already shown the loading screen this session
    const hasLoaded = sessionStorage.getItem('vsoc_loaded')
    if (hasLoaded) {
      setGameLoading(false)
    }
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setGameLoading(false)
    sessionStorage.setItem('vsoc_loaded', 'true')
    window.scrollTo(0, 0)
  }, [])

  const startGame = () => {
    setGameStarted(true)
    setScore(prev => prev + 100)
  }

  // Effect hooks must be unconditional too
  // Audio logic moved to global context

  useEffect(() => {
    if (!authLoading && user) {
      if (user.userType === 'mentor') {
        router.push('/mentor-dashboard')
      } else {
        router.push('/student-dashboard')
      }
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !gameStarted) {
        startGame()
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleSound()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, toggleSound])

  useEffect(() => {
    const interval = setInterval(() => {
      setXp(prev => {
        const newXp = prev + 1
        if (newXp >= 1000) {
          setScore(prevScore => prevScore + 1000)
          return 0
        }
        return newXp
      })
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Prevent flash of content AFTER all hooks have run
  if (authLoading || user) return <LoadingScreen />

  // Timeline Events Data
  const timelineEvents = [
    { date: '14-15 FEB', title: 'Mentor Registration', desc: 'Mentors sign up to lead projects', color: 'cyan', icon: '📝' },
    { date: '15-27 FEB', title: 'Project Listing', desc: 'Open source projects are announced', color: 'magenta', icon: '📋' },
    { date: '28 FEB', title: 'Student Registration', desc: 'Students sign up to participate', color: 'red', icon: '📋' },
    { date: '1 MAR - 20 APR', title: 'Coding Period', desc: '50 Days of Code & Contribution', color: 'green', icon: '💻' },
    { date: 'LATE APRIL', title: 'Results Declared', desc: 'Winners & Top Contributors announced', color: 'yellow', icon: '🏆' }
  ]

  const powerUps = [
    { icon: '⚡', title: 'Real Experience', desc: 'Work on real open source projects', color: 'yellow' },
    { icon: '🎯', title: 'Mentorship', desc: 'Guidance from experienced maintainers', color: 'cyan' },
    { icon: '👥', title: 'Community', desc: 'Join passionate developers', color: 'magenta' },
    { icon: '🏆', title: 'Recognition', desc: 'Certificates & leaderboard ranking', color: 'green' },
    { icon: '💼', title: 'Career Boost', desc: 'Enhance your developer profile', color: 'blue' },
    { icon: '🚀', title: 'Accelerated Learning', desc: 'Fast-track your skills growth', color: 'red' }
  ]

  const steps = [
    { step: '01', title: 'Register', desc: 'Create your player profile', icon: '📝' },
    { step: '02', title: 'Choose Domain', desc: 'Select your open source track', icon: '🎯' },
    { step: '03', title: 'Contribute', desc: 'Work on project issues', icon: '💻' },
    { step: '04', title: 'Gain XP', desc: 'Earn points for contributions', icon: '⭐' },
    { step: '05', title: 'Get Badges', desc: 'Complete final evaluation', icon: '👑' }
  ]

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {gameLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <section className="min-h-screen flex items-center justify-center px-4 pt-40 pb-20 sm:pt-32 sm:pb-0">
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <h1 className="font-pixel text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-4 animate-pulse-glow leading-none sm:leading-normal whitespace-nowrap">
            <span className="text-cyan-400 pixel-text">V</span>
            <span className="text-magenta-400 pixel-text">S</span>
            <span className="text-green-400 pixel-text">o</span>
            <span className="text-yellow-400 pixel-text">C</span>
            <span className="text-white-400 pixel-text">`</span>
            <span className="text-red-400 pixel-text">2</span>
            <span className="text-blue-400 pixel-text">6</span>
          </h1>
          
          <h2 className="font-silkscreen text-sm sm:text-xl md:text-2xl mb-8 text-gray-300 px-2">
            Vishwakarma Summer of Code
            <br className="block sm:hidden" />
            <br className="hidden sm:block" />
            <span className="text-xs sm:text-lg text-gray-400 block mt-2 sm:mt-0">by OSCG · Vishwakarma Institute of Technology, Pune</span>
          </h2>

          <div className="w-full flex justify-center scale-75 sm:scale-100 origin-center">
            <CoinInsert ref={coinInsertRef} />
          </div>
        </div>
      </section>

      <section id="timeline" className="py-12 sm:py-20 px-4 max-w-5xl mx-auto">
        <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-center mb-16 text-cyan-400 pixel-text border-b-4 border-cyan-800 pb-4">
          EVENT TIMELINE
        </h2>

        <div className="relative ml-4 md:ml-1/2 md:-translate-x-0.5 space-y-12 md:space-y-16">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 bottom-0 w-1 bg-cyan-800 left-[-4px] md:left-1/2 md:-ml-1 -z-10"></div>

          {timelineEvents.map((event, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-[-22px] md:left-1/2 md:ml-[-22px] w-10 h-10 rounded-full border-4 border-cyan-500 bg-gray-900 z-10 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-cyan-900 transition-all duration-300">
                {event.icon}
              </div>

              {/* Content Card */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                <div className={`p-6 border-4 border-${event.color}-700 bg-gray-900/80 hover:border-${event.color}-400 transition-colors duration-300 rounded-none relative`}>
                  <div className={`font-pixel text-sm text-${event.color}-400 mb-2`}>{event.date}</div>
                  <h3 className="font-pixel text-xl text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm font-sans">{event.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Note */}
        <div className="mt-20 text-center relative z-10">
          <div className="inline-block bg-gradient-to-r from-yellow-900/20 to-yellow-900/40 border-4 border-yellow-600 p-6 md:p-8 transform hover:scale-105 transition-transform duration-300 animate-float">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="font-pixel text-yellow-400 text-lg md:text-xl mb-3 pixel-text">WEEKLY LEADERBOARDS</h3>
            <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto">
              Weekly leaderboards will be maintained throughout the coding period. 
              <br className="hidden md:block"/>
              <span className="text-yellow-200">Exclusive badges</span> will be awarded to top contributors!
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-center mb-12 text-magenta-400 pixel-text">
          THE EXPOSURE YOU WILL GET
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {powerUps.map((powerup, idx) => (
            <div
              key={idx}
              className="p-6 border-4 border-magenta-800 bg-gradient-to-br from-gray-900 to-black rounded-none transform transition-all duration-300 hover:scale-105 hover:border-magenta-400 hover:shadow-2xl hover:shadow-magenta-500/30 group animate-float"
              style={{ animationDelay: `${idx * 0.5}s` }}
            >
              <div className="text-4xl mb-4 text-center">{powerup.icon}</div>
              <h3 className={`font-pixel text-xl text-${powerup.color}-400 text-center mb-3 pixel-text`}>
                {powerup.title}
              </h3>
              <p className="text-gray-300 text-center">{powerup.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 sm:py-20 px-4 max-w-6xl mx-auto">
        <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-center mb-16 text-green-400 pixel-text">
          HOW THE GAME WORKS
        </h2>

        <div className="relative">
          <ArcadeMapPath steps={steps} />
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 max-w-4xl mx-auto">
        <div className={`border-8 border-red-600 bg-gradient-to-br from-red-900/40 to-black p-6 sm:p-12 rounded-none transform transition-all duration-500 hover:scale-105 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30 ${bossShake ? 'animate-shake' : ''}`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl sm:text-8xl animate-float">👾</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-pixel text-2xl sm:text-4xl text-red-400 mb-6 pixel-text">
                READY TO TAKE THE OPEN SOURCE CHALLENGE?
              </h2>
              <p className="text-gray-300 mb-8 text-base sm:text-lg">
                Join VSoC and prove your skills in the ultimate coding challenge. 
                Battle bugs, conquer features, and level up your career.
              </p>
              <button 
                className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-700 to-red-900 font-pixel text-sm sm:text-lg rounded-none border-4 border-red-500 arcade-btn hover:border-red-400 hover:from-red-600 hover:to-red-800"
                onClick={handleJoinChallenge}
              >
                ⚔️ JOIN THE CHALLENGE
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
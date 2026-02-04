'use client'

import { useRouter } from 'next/navigation'
import { SignupForm } from '@/components'

export default function MentorSignup() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen bg-black selection:bg-cyan-500/30">
      {/* HUD Removed in favor of global Navbar */}

      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="w-full max-w-4xl relative z-10">
          {/* Page Title */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white">
              Mentor <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Access</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Initialize your mentorship profile. Guide the next generation of open source contributors through the VSoC '26 program.
            </p>
          </div>

          {/* Signup Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <SignupForm userType="mentor" variant="professional" />
          </div>

          {/* Info Box - Glass Style */}
          <div className="mt-8 p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl animate-slide-up shadow-xl" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-cyan-400">❖</span> Mentor Protocol Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-400 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200 text-sm mb-1">Project Leadership</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Guide students on real-world open source architecture and codebase maintenance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-400 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200 text-sm mb-1">Global Impact</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Build your reputation in the global open source community and expand your professional network.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-400 mt-1">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200 text-sm mb-1">Certification</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Receive official recognition and certificates for your contribution to the program.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-400 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200 text-sm mb-1">Community Access</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Join an exclusive network of maintainers, industry experts, and fellow mentors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

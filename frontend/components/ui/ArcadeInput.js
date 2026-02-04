'use client'

import { useState } from 'react'

export default function ArcadeInput({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  required = false,
  maxLength,
  error,
  success,
  variant = 'arcade' // 'arcade' | 'professional'
}) {
  const [focused, setFocused] = useState(false)

  const isProfessional = variant === 'professional'

  // Variant-specific styles
  const baseBorder = isProfessional 
    ? (focused ? 'border-cyan-400' : 'border-cyan-700/50') 
    : (focused ? 'border-cyan-400' : 'border-cyan-700')

  const borderColor = error 
    ? 'border-red-500' 
    : success 
    ? 'border-green-500' 
    : baseBorder

  const glowColor = error 
    ? 'shadow-red-500/50' 
    : success 
    ? 'shadow-green-500/50' 
    : 'shadow-cyan-500/50'

  const containerStyles = isProfessional
    ? `bg-gray-900/50 backdrop-blur-sm border ${borderColor} rounded-sm`
    : `bg-gray-900 border-4 ${borderColor} rounded-none`

  const labelStyles = isProfessional
    ? "block font-sans text-xs font-bold tracking-widest text-cyan-400/80 mb-2 uppercase"
    : "block font-pixel text-sm text-cyan-400 mb-2 pixel-text"

  return (
    <div className="mb-6">
      {/* Label */}
      <label 
        htmlFor={name} 
        className={labelStyles}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className={`
            w-full px-4 py-3 
            text-white font-sans
            focus:outline-none
            transition-all duration-300
            ${containerStyles}
            ${focused ? `shadow-lg ${glowColor}` : ''}
            ${!isProfessional && error ? 'animate-shake' : ''}
            ${!isProfessional && success ? 'animate-pulse-glow' : ''}
          `}
        />

        {/* Character Counter */}
        {maxLength && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {value?.length || 0}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className={`mt-2 text-xs text-red-400 animate-slide-down ${isProfessional ? 'font-sans' : 'font-pixel'}`}>
          ⚠ {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className={`mt-2 text-xs text-green-400 animate-slide-down ${isProfessional ? 'font-sans' : 'font-pixel'}`}>
          ✓ {success}
        </div>
      )}
    </div>
  )
}

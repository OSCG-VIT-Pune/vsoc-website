'use client'

/**
 * StepCard Component
 * A reusable card component for displaying process steps
 * 
 * @param {Object} props
 * @param {string} props.step - Step number (e.g., '01', '02')
 * @param {string} props.title - Step title
 * @param {string} props.description - Step description
 * @param {string} props.icon - Emoji icon for the step
 * @param {boolean} props.showArrow - Whether to show arrow to next step
 */
export default function StepCard({ 
  step, 
  title, 
  description, 
  icon,
  showArrow = false
}) {
  return (
    <div className="relative z-10 w-full">
      <div className="relative bg-gray-900 p-6 text-center group transition-all duration-300 hover:-translate-y-2">
        {/* Pixel Art Border using box-shadow */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{
               boxShadow: `
                 -4px 0 0 0 #047857,
                 4px 0 0 0 #047857,
                 0 -4px 0 0 #047857,
                 0 4px 0 0 #047857,
                 -4px -4px 0 0 #047857,
                 4px -4px 0 0 #047857,
                 4px 4px 0 0 #047857,
                 -4px 4px 0 0 #047857
               `
             }}
        ></div>
        
        {/* Hover Highlight (Inner Border) */}
        <div className="absolute inset-0 border-4 border-transparent group-hover:border-green-400 transition-colors duration-300 pointer-events-none"></div>

        {/* Level Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-700 text-white font-pixel text-xs px-3 py-1 border-2 border-green-500 shadow-lg">
          LEVEL {step}
        </div>

        <div className="mt-4 text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg filter">
          {icon}
        </div>
        
        <h3 className="font-pixel text-lg sm:text-xl text-green-400 mb-3 pixel-text leading-tight">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 font-sans leading-relaxed">
          {description}
        </p>
      </div>
      
      {showArrow && (
        <div className="hidden md:flex absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 text-green-500 font-pixel text-4xl z-20 animate-pulse">
          ▶
        </div>
      )}
    </div>
  )
}

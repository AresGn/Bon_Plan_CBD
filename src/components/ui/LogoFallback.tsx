'use client'

interface LogoFallbackProps {
  width?: number
  height?: number
  className?: string
}

export default function LogoFallback({ 
  width = 40, 
  height = 40, 
  className = "" 
}: LogoFallbackProps) {
  return (
    <div 
      className={`flex items-center justify-center bg-primary-600 text-white rounded-lg ${className}`}
      style={{ width, height }}
    >
      <span className="font-bold text-sm">
        {width >= 40 ? 'CBD' : 'C'}
      </span>
    </div>
  )
}

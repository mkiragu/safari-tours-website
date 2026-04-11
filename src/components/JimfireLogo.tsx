interface JimfireLogoProps {
  className?: string
  variant?: 'default' | 'light'
}

export function JimfireLogo({ className = '', variant = 'default' }: JimfireLogoProps) {
  const accentColor = variant === 'light' ? '#ffffff' : '#6B7FD7'
  const textColor = variant === 'light' ? '#ffffff' : '#404040'
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <circle cx="20" cy="20" r="19" fill={accentColor} fillOpacity="0.15" />
        <path
          d="M20 8C18.5 8 17.5 9 17 10.5C16.8 11 16.5 12 16.5 13C16.5 14 16.8 15 17.5 16C18 16.8 19 17.5 20 18C21 17.5 22 16.8 22.5 16C23.2 15 23.5 14 23.5 13C23.5 12 23.2 11 23 10.5C22.5 9 21.5 8 20 8Z"
          fill={accentColor}
        />
        <path
          d="M13 14C12 14.5 11.5 15.5 11.5 16.5C11.5 17.5 12 18.5 13 19L15 20.5C16 21 17 21 18 20.5C18.5 20.2 19 19.5 19 18.5C19 17.5 18.5 16.5 18 16L16 14.5C15 14 14 14 13 14Z"
          fill={accentColor}
          fillOpacity="0.8"
        />
        <path
          d="M27 14C26 14 25 14 24 14.5L22 16C21.5 16.5 21 17.5 21 18.5C21 19.5 21.5 20.2 22 20.5C23 21 24 21 25 20.5L27 19C28 18.5 28.5 17.5 28.5 16.5C28.5 15.5 28 14.5 27 14Z"
          fill={accentColor}
          fillOpacity="0.8"
        />
        <ellipse cx="20" cy="24" rx="10" ry="3" fill={accentColor} fillOpacity="0.2" />
        <path
          d="M12 22C11 22.5 10 23.5 10 25C10 26.5 11 28 12 29L14 30.5C15.5 31.5 17 32 18.5 31.5C19.5 31.2 20.5 30 20.5 28.5C20.5 27 20 25.5 19 24.5L17 23C15.5 22 13.5 21.5 12 22Z"
          fill={accentColor}
        />
        <path
          d="M28 22C26.5 21.5 24.5 22 23 23L21 24.5C20 25.5 19.5 27 19.5 28.5C19.5 30 20.5 31.2 21.5 31.5C23 32 24.5 31.5 26 30.5L28 29C29 28 30 26.5 30 25C30 23.5 29 22.5 28 22Z"
          fill={accentColor}
        />
      </svg>
      <div className="flex flex-col leading-tight">
        <span 
          className="text-lg md:text-xl font-bold tracking-wide"
          style={{ color: textColor }}
        >
          Jimfire Safaris
        </span>
        <span 
          className="text-[10px] md:text-xs font-medium tracking-wider uppercase opacity-75"
          style={{ color: textColor }}
        >
          & Transfers
        </span>
      </div>
    </div>
  )
}

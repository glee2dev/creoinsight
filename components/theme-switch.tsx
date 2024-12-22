'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-14 h-7" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="theme-switch"
      data-state={theme}
      aria-label="Toggle theme"
    >
      <div className="theme-switch-icons">
        <SunIcon />
        <MoonIcon />
      </div>
      <div className="theme-switch-thumb" />
    </button>
  )
}

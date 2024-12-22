'use client'

import { useEffect } from 'react'

export function initializeProjectCards() {
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card')

    cards.forEach(card => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = (card as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}px`)
        ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}px`)
      })
    })
  }, [])

  return null
}

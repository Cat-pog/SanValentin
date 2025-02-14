"use client"

import { useState, useEffect } from "react"

const zipMessage = "14344"

export default function SurprisePage() {
  const [revealedDigits, setRevealedDigits] = useState<string[]>([])

  useEffect(() => {
    const revealDigits = async () => {
      for (let i = 0; i < zipMessage.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setRevealedDigits((prev) => [...prev, zipMessage[i]])
      }
    }
    revealDigits()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-red-200 to-white p-4">
      {/* ... */}
    </div>
  )
}


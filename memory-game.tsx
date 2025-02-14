"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

type MemoryCard = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

const createCards = (): MemoryCard[] => {
  const values = ["A", "B", "C", "D", "E", "F"]
  const cards: MemoryCard[] = []
  const numPairs = values.length

  for (let i = 0; i < numPairs; i++) {
    cards.push({ id: i * 2, value: values[i], isFlipped: false, isMatched: false })
    cards.push({ id: i * 2 + 1, value: values[i], isFlipped: false, isMatched: false })
  }

  return cards.sort(() => Math.random() - 0.5)
}

export default function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>(createCards())
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [isChecking, setIsChecking] = useState(false)

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isMatched || flippedIndexes.includes(index)) {
      return
    }

    setFlippedIndexes([...flippedIndexes, index])

    if (flippedIndexes.length === 1) {
      return
    }

    setIsChecking(true)

    const [index1, index2] = flippedIndexes

    if (cards[index1].value === cards[index2].value) {
      setMatches(matches + 1)
      setCards((prevCards) => {
        const newCards = [...prevCards]
        newCards[index1].isMatched = true
        newCards[index2].isMatched = true
        return newCards
      })
      toast.success("Match found!")
    } else {
      toast.error("No match!")
      setTimeout(() => {
        setFlippedIndexes([])
        setCards((prevCards) => {
          const newCards = [...prevCards]
          newCards[index1].isFlipped = false
          newCards[index2].isFlipped = false
          return newCards
        })
      }, 1000)
    }

    setIsChecking(false)
  }

  const handleReset = () => {
    setCards(createCards())
    setFlippedIndexes([])
    setMatches(0)
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 space-y-8 md:space-y-0 md:space-x-8 bg-gradient-to-br from-pink-100 via-red-100 to-white">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Memory Game</h1>
        <p className="text-lg text-gray-600">Find all the matching pairs!</p>
        <p className="text-lg text-gray-600">
          Matches: {matches} / {cards.length / 2}
        </p>
        <Button onClick={handleReset}>Reset</Button>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg">
        {cards.map((card, index) => (
          <Card key={card.id} onClick={() => handleCardClick(index)}>
            <AnimatePresence>
              {card.isFlipped || card.isMatched ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-5xl font-bold text-gray-800"
                >
                  {card.value}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </div>
  )
}


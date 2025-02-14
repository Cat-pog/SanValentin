"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import confetti from "canvas-confetti"
import { Heart, Flower, Star, Cloud, Sun, Moon } from "lucide-react"
import Image from "next/image"

const letters = ["J", "U", "L", "I", "S", "S", "A"]
const zipMessage = "200805"
const acrostic = [
  "Just when I think I couldn't love you more,",
  "Unconditionally, my heart grows fonder.",
  "Love blooms anew with each passing day,",
  "Illuminating my world in every way.",
  "Soulmates forever, that's what we are,",
  "Sharing a bond that will take us far.",
  "Always and forever, my love for you will stay.",
]

const decorations = [
  { Icon: Flower, color: "text-pink-300" },
  { Icon: Star, color: "text-yellow-300" },
  { Icon: Cloud, color: "text-blue-200" },
  { Icon: Sun, color: "text-orange-300" },
  { Icon: Moon, color: "text-indigo-300" },
  { Icon: Flower, color: "text-red-300" },
  { Icon: Flower, color: "text-purple-300" },
]

const helloKittyImages = [
  "/placeholder.svg?text=HelloKitty1",
  "/placeholder.svg?text=HelloKitty2",
  "/placeholder.svg?text=HelloKitty3",
  "/placeholder.svg?text=HelloKitty4",
]

export default function LoveDeclaration() {
  const [revealedLetters, setRevealedLetters] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [revealedDigits, setRevealedDigits] = useState<string[]>([])
  const [inputCode, setInputCode] = useState("")
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [exitAnimation, setExitAnimation] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [showAcrostic, setShowAcrostic] = useState(false)
  const [showFinalImage, setShowFinalImage] = useState(false)
  const [showExitButton, setShowExitButton] = useState(false)
  const [shatterAnimation, setShatterAnimation] = useState(false)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const buttonControls = useAnimation()

  useEffect(() => {
    if (revealedLetters.length === letters.length) {
      setTimeout(() => {
        setShowMessage(true)
        confetti({
          particleCount: 150,
          spread: 180,
          origin: { y: 0.6 },
          shapes: ["heart"],
          colors: ["#ff69b4", "#ff1493", "#ff6347"],
        })
      }, 1000)
    }
  }, [revealedLetters])

  const handleHeartClick = (letterKey: string) => {
    if (!revealedLetters.includes(letterKey)) {
      setRevealedLetters([...revealedLetters, letterKey])
    }
  }

  const handleUnlockSurprise = () => {
    setShowSurprise(true)
    revealDigits()
  }

  const revealDigits = async () => {
    for (let i = 0; i < zipMessage.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRevealedDigits((prev) => [...prev, zipMessage[i]])
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputCode === zipMessage) {
      setShowFinalMessage(true)
      setTimeout(() => setShowAcrostic(true), 2000)
      setTimeout(() => setShowFinalImage(true), 6000)
      setTimeout(() => setShowExitButton(true), 8000)
    } else {
      setButtonDisabled(true)
      await buttonControls.start({
        x: [0, -10, 10, -10, 10, 0],
        y: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.5 },
      })
      for (let i = 0; i < 5; i++) {
        await buttonControls.start({
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          transition: { duration: 0.3 },
        })
      }
      await buttonControls.start({ x: 0, y: 0, transition: { duration: 0.5 } })
      setTimeout(() => setButtonDisabled(false), 2000)
    }
  }

  const handleExit = () => {
    setShatterAnimation(true)
    setTimeout(() => {
      setExitAnimation(true)
      setTimeout(() => {
        setShowFinalMessage(false)
        setExitAnimation(false)
        window.location.reload()
      }, 3000)
    }, 2000)
  }

  const shatterVariants = {
    initial: { opacity: 1 },
    animate: (i: number) => ({
      opacity: 0,
      x: (Math.random() - 0.5) * 500,
      y: (Math.random() - 0.5) * 500,
      rotate: Math.random() * 360,
      transition: { duration: 1.5, delay: i * 0.01 },
    }),
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-red-100 to-white p-4 relative overflow-hidden">
      {/* Decorative elements */}
      {decorations.map((Decoration, index) =>
        Array(7)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={`${index}-${i}`}
              className={`absolute ${Decoration.color}`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1.2, 0.8],
                rotate: 360,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Decoration.Icon size={15 + Math.random() * 25} />
            </motion.div>
          )),
      )}

      <AnimatePresence>
        {!showSurprise && !showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center"
            >
              A Special Message for You
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {letters.map((letter, index) => (
                <motion.div
                  key={`${letter}-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
                      revealedLetters.includes(`${letter}-${index}`) ? "bg-pink-400" : "bg-pink-200"
                    } shadow-md focus:outline-none`}
                    onClick={() => handleHeartClick(`${letter}-${index}`)}
                  >
                    {revealedLetters.includes(`${letter}-${index}`) ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-2xl md:text-3xl font-bold text-white"
                      >
                        {letter}
                      </motion.span>
                    ) : (
                      <Heart className="w-8 h-8 md:w-10 md:h-10 text-pink-400" />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {showMessage && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-pink-600 mb-4">
                  Julissa, you make my heart flutter!
                </p>
                <p className="text-lg md:text-xl text-pink-500">Every moment with you is a treasure.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-colors duration-300"
                  onClick={handleUnlockSurprise}
                >
                  Unlock Your Surprise
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSurprise && !showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-red-100 to-white z-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center"
            >
              Your Special Surprise
            </motion.h2>

            <div className="flex justify-center gap-4 mb-8">
              {zipMessage.split("").map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                  animate={{
                    opacity: revealedDigits.includes(digit) ? 1 : 0,
                    scale: revealedDigits.includes(digit) ? 1 : 0,
                    rotateY: revealedDigits.includes(digit) ? 0 : 180,
                  }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-pink-400 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl md:text-3xl font-bold text-white">{digit}</span>
                </motion.div>
              ))}
            </div>

            <motion.form
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6, type: "spring", stiffness: 100 }}
              onSubmit={handleCodeSubmit}
              className="mt-8 flex flex-col items-center"
            >
              <motion.input
                whileFocus={{ scale: 1.05, boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.3)" }}
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter the code"
                className="px-4 py-2 rounded-full border-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-all duration-300"
              />
              <motion.button
                ref={submitButtonRef}
                animate={buttonControls}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={buttonDisabled}
                type="submit"
                className={`mt-4 px-6 py-2 bg-pink-500 text-white rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-all duration-300 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Submit
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFinalMessage && !shatterAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="absolute inset-0 flex flex-col items-center justify-start bg-gradient-to-br from-pink-100 via-red-100 to-white p-8 z-30 overflow-y-auto"
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full flex flex-col items-center relative mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            >
              {/* Hello Kitty decorations */}
              {helloKittyImages.map((src, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt="Hello Kitty"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 100 }}
              >
                <Image src="/placeholder.svg" alt="Love" width={300} height={300} className="rounded-lg mb-6" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-2xl font-bold text-pink-600 mb-4"
              >
                My Love for You
              </motion.h3>
              {showAcrostic && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  {acrostic.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
                      className="text-gray-700"
                    >
                      <span className="font-bold text-pink-500">{line[0]}</span>
                      {line.slice(1)}
                    </motion.p>
                  ))}
                </motion.div>
              )}
              {showFinalImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
                  className="mt-8"
                >
                  <Image
                    src="/placeholder.svg"
                    alt="Our Love Story"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-4 text-lg text-gray-700 text-center"
                  >
                    Our love story is just beginning, and I can't wait to write every chapter with you.
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
            <AnimatePresence>
              {showExitButton && (
                <motion.button
                  initial={{ opacity: 0, y: 50, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-all duration-300"
                  onClick={handleExit}
                >
                  Exit
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shatterAnimation && (
          <div className="fixed inset-0 z-50">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={shatterVariants}
                initial="initial"
                animate="animate"
                className="absolute w-20 h-20 bg-white"
                style={{
                  top: `${Math.floor(i / 10) * 10}%`,
                  left: `${(i % 10) * 10}%`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exitAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
            >
              <Image src="/placeholder.svg" alt="Cute Kitten" width={200} height={200} className="rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


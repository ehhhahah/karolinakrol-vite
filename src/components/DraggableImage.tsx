import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import useSound from 'use-sound'

const SOUND_1_URL = 'sounds/469066.wav'

interface DraggableImageProps {
  src: string
  alt: string
  description: string
  index: number
  isVisible?: boolean
}

const DraggableImage: React.FC<DraggableImageProps> = ({ src, alt, description, index, isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragControls = useRef({ startX: 0, startY: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const [play] = useSound(SOUND_1_URL)

  // Generate unique animation parameters based on index
  const generateFloatingAnimation = (idx: number) => {
    const amplitude = 10 + (idx % 3) * 5 // Varies between 10-20px
    const duration = 3 + (idx % 4) // Varies between 3-6s
    const delay = (idx % 5) * 0.2 // Staggered start

    const paths = [
      {
        // Circular
        x: [0, amplitude, 0, -amplitude, 0],
        y: [0, -amplitude, 0, amplitude, 0]
      },
      {
        // Figure-8
        x: [0, amplitude, 0, -amplitude, 0],
        y: [0, -amplitude / 2, 0, -amplitude / 2, 0]
      },
      {
        // Diagonal
        x: [0, amplitude, -amplitude, 0],
        y: [0, -amplitude, amplitude, 0]
      }
    ]

    const selectedPath = paths[idx % paths.length]

    return {
      ...selectedPath,
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  useEffect(() => {
    const randomX = Math.random() * (window.innerWidth - 200)
    const randomY = Math.random() * (window.innerHeight - 200)
    setPosition({ x: randomX, y: randomY })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      dragControls.current = {
        startX: e.clientX - position.x,
        startY: e.clientY - position.y
      }
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragControls.current.startX,
        y: e.clientY - dragControls.current.startY
      })
      e.preventDefault()
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleOpen = () => {
    setIsOpen(true)
    // play()
  }
  const handleClose = () => {
    setIsOpen(false)
    // play()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            cursor: isDragging ? 'grabbing' : 'grab',
            zIndex: isDragging ? 1000 : 1,
            userSelect: 'none'
          }}
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: isDragging ? 1.1 : 1,
            ...(!isDragging ? generateFloatingAnimation(index) : {})
          }}
          exit={{
            scale: 0.9,
            opacity: 0.5,
            transition: { duration: 0.5 }
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          key={index}>
          <motion.img ref={imageRef} className='draggable-image' src={src} alt={alt} loading='lazy' draggable={false} />
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && <Modal isOpen={isOpen} onClose={handleClose} description={description} images={[src, src]} />}
      </AnimatePresence>
    </AnimatePresence>
  )
}

export default DraggableImage

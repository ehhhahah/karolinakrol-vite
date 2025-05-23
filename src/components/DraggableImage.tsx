import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import useSound from 'use-sound'
import ProgressiveImage from 'react-progressive-graceful-image'

const SOUND_1_URL = 'sounds/469066.wav'

interface DraggableImageProps {
  src: string
  other_srcs?: string[]
  alt: string
  description: string
  index: number
  isVisible?: boolean
  allow_delay?: boolean
}

const DraggableImage: React.FC<DraggableImageProps> = ({ src: thumbnail_src, other_srcs, alt, description, index, isVisible = true, allow_delay = true }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragControls = useRef({ startX: 0, startY: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const [play] = useSound(SOUND_1_URL)
  const [lastTap, setLastTap] = useState(0) // For double tap detection
  const lastDragTime = useRef(0) // Track when dragging ended
  const hasMoved = useRef(false) // Track if there was actual movement during drag

  // Generate unique animation parameters based on index
  const generateFloatingAnimation = (idx: number) => {
    const amplitude = 0 + (idx % 3) * 5 // in px
    const duration = 12 + (idx % 4) // In seconds
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
      hasMoved.current = false;
      setIsDragging(true)
      dragControls.current = {
        startX: e.clientX - position.x,
        startY: e.clientY - position.y
      }
      e.preventDefault()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    hasMoved.current = false;
    setIsDragging(true)
    dragControls.current = {
      startX: touch.clientX - position.x,
      startY: touch.clientY - position.y
    }

    // Double tap detection
    const now = Date.now()
    const timeSinceLastTap = now - lastTap
    if (timeSinceLastTap < 300) { // 300ms between taps
      handleOpen()
    }
    setLastTap(now)

    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      hasMoved.current = true;
      setPosition({
        x: e.clientX - dragControls.current.startX,
        y: e.clientY - dragControls.current.startY
      })
      e.preventDefault()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      hasMoved.current = true;
      const touch = e.touches[0]
      setPosition({
        x: touch.clientX - dragControls.current.startX,
        y: touch.clientY - dragControls.current.startY
      })
      e.preventDefault()
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      if (hasMoved.current) {
        lastDragTime.current = Date.now();
      }
      setIsDragging(false);
    }
  }

  const handleTouchEnd = () => {
    if (isDragging) {
      if (hasMoved.current) {
        lastDragTime.current = Date.now();
      }
      setIsDragging(false);
    }
  }

  const handleOpen = () => {
    // Allow opening if:
    // 1. We're not currently dragging
    // 2. Either no dragging has happened yet (lastDragTime.current is 0) 
    //    or enough time has passed since the last drag ended
    if (!isDragging && (lastDragTime.current === 0 || Date.now() - lastDragTime.current > 150)) {
      setIsOpen(true)
      play()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    play()
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
            userSelect: 'none',
            touchAction: 'none' // Prevent scrolling while dragging
          }}
          animate={{
            scale: isDragging ? 1.1 : 1,
            ...(!isDragging ? generateFloatingAnimation(index) : {})
          }}
          exit={{
            scale: 0.9,
            transition: { duration: 0.5 }
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          key={index}>
          <ProgressiveImage src={thumbnail_src} placeholder={thumbnail_src} delay={allow_delay ? 400 * index : 0}>
            {(src, loading) => <motion.img className={`lazyload draggable-image ${loading ? "thumbnail-preview" : "loaded"}`} ref={imageRef}
              loading='lazy'
              draggable={false}
              style={{ touchAction: 'none' }} // Prevent scrolling while dragging
              src={src}
              alt={alt} />}
          </ProgressiveImage>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && <Modal isOpen={isOpen} onClose={handleClose} title={alt} description={description} images={other_srcs || []} />}
      </AnimatePresence>
    </AnimatePresence>
  )
}

export default DraggableImage
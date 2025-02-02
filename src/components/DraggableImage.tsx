import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import Modal from './Modal'

interface DraggableImageProps {
  src: string
  alt: string
  description: string
}

const DraggableImage: React.FC<DraggableImageProps> = ({ src, alt, description }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragControls = useRef({ startX: 0, startY: 0 })
  const imageRef = useRef<HTMLImageElement>(null)

  // Random initial position within viewport bounds
  useEffect(() => {
    const randomX = Math.random() * (window.innerWidth - 200) // 200 is approx image width
    const randomY = Math.random() * (window.innerHeight - 200) // 200 is approx image height
    setPosition({ x: randomX, y: randomY })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left click only
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
      const newX = e.clientX - dragControls.current.startX
      const newY = e.clientY - dragControls.current.startY
      setPosition({ x: newX, y: newY })
      e.preventDefault()
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Gentle floating animation
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <motion.div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: isDragging ? 1000 : 1,
          userSelect: 'none'
        }}
        animate={!isDragging ? floatingAnimation : undefined}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleOpen}
        onTap={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <motion.img
          ref={imageRef}
          className='draggable-image'
          src={src}
          alt={alt}
          loading='lazy'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          draggable={false}
        />
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='description-overlay'
            style={{
              position: 'absolute',
              bottom: -30,
              left: 0,
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '5px',
              borderRadius: '4px',
              fontSize: '12px',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
            {description}
          </motion.div>
        )}
      </motion.div>
      <Modal isOpen={isOpen} onClose={handleClose} description={description}>
        <img src={src} alt={alt} />
      </Modal>
    </>
  )
}

export default DraggableImage

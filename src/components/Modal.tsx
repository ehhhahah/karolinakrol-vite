import React, { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import './Modal.css'
import xIcon from './../assets/x.png'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  description?: string
  images?: string[]
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, description, images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselItems = images
  const swipeThreshold = 50 // minimum distance to trigger slide change

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (carouselItems.length <= 1) return

    const swipeDistance = info.offset.x
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='modal-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className='modal-content'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}>
            <div className='carousel'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='carousel-item'
                drag={carouselItems.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                style={{ touchAction: 'none' }}>
                <img
                  src={carouselItems[currentIndex]}
                  alt={`Slide ${currentIndex}`}
                  className='carousel-image'
                  draggable={false} // Prevent default image dragging
                />
              </motion.div>
            </div>

            {/* Description */}
            <div className='description marquee'>{description && <span>{description}</span>}</div>

            {/* Buttons */}
            <motion.button
              className='close-button'
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <img src={xIcon} className='close-button-img' alt='Close' />
            </motion.button>

            {images.length > 1 && (
              <>
                <motion.button
                  className='prev-button'
                  onClick={prevSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  Prev
                </motion.button>
                <motion.button
                  className='next-button'
                  onClick={nextSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  Next
                </motion.button>
              </>
            )}

            <div className='carousel-counter'>
              {currentIndex + 1} / {carouselItems.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
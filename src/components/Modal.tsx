import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const carouselItems = description ? [description, ...images] : images

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)
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
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}>
            <div className='carousel'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='carousel-item'>
                {typeof carouselItems[currentIndex] === 'string' && carouselItems[currentIndex].startsWith('http') ? (
                  <img src={carouselItems[currentIndex]} alt={`Slide ${currentIndex}`} className='carousel-image' />
                ) : (
                  <p className='carousel-description'>{carouselItems[currentIndex]}</p>
                )}
              </motion.div>
            </div>
            {/* Buttons */}
            <motion.button
              className='close-button'
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <img src={xIcon} className='close-button-img' alt='Close' />
            </motion.button>
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

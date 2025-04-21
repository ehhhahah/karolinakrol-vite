import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import './../styles/Modal.css'
import xIcon from './../assets/x.png'
import lewoStrzalka from './../assets/lewo_strzalka.png'
import prawoStrzalka from './../assets/prawo_strzalka.png'


interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  images?: string[]
}

const getDescriptionCarouselItem = (title: string, description: string | undefined) => {
  return (
    <div className='carousel-item text-modal-item'>
      <h2 className='text-modal-title'>{title}</h2>
      {description && <p className='text-modal-desc'>{description}</p>}
    </div>
  )
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const carouselItems = [getDescriptionCarouselItem(title, description), ...images]
  const swipeThreshold = 50 // minimum distance to trigger slide change

  // Preload images when modal opens
  // TODO implement caching for images within the modal
  useEffect(() => {
    if (isOpen && images.length > 0) {
      let loadedCount = 0
      const imagePromises = images.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            loadedCount++
            if (loadedCount === images.length) {
              setImagesLoaded(true)
            }
            resolve()
          }
          img.onerror = () => {
            loadedCount++
            if (loadedCount === images.length) {
              setImagesLoaded(true)
            }
            resolve()
          }
          img.src = src
        })
      })

      // Consider all images loaded after a timeout as fallback
      const timeoutId = setTimeout(() => {
        if (!imagesLoaded) {
          setImagesLoaded(true)
        }
      }, 5000) // 5 seconds timeout

      Promise.all(imagePromises).then(() => {
        clearTimeout(timeoutId)
        setImagesLoaded(true)
      })

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isOpen, images])

  useEffect(() => {
    // Reset current index and loaded state when modal closes
    if (!isOpen) {
      setCurrentIndex(0)
      setImagesLoaded(false)
    }
  }, [isOpen])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, prevSlide, nextSlide, onClose]);



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
            <motion.div
              className='carousel'
              drag={carouselItems.length > 1 ? "x" : false} // Enable drag for the entire carousel
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd} // Handle drag end for all content
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='carousel-item'
              >
                {/* Display the description or image based on the current index */}
                {currentIndex === 0 ? (
                  <>
                    {carouselItems[currentIndex]}
                    {/* If computer view, display first image next to description */}
                    {images.length >= 1 && currentIndex + 1 < carouselItems.length && window.innerWidth > 768 &&
                      <img
                        src={carouselItems[currentIndex + 1]}
                        alt={`Slide ${currentIndex}`}
                        className='carousel-image next-to-text'
                        draggable={false} // Prevent default image dragging
                      />}
                  </>
                ) : (
                  <img
                    src={carouselItems[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className='carousel-image'
                    draggable={false} // Prevent default image dragging
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.button
              className='close-button'
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <img src={xIcon} className='close-button-img' alt='Close' />
            </motion.button>

            <>
              <img
                src={lewoStrzalka}
                alt="Previous"
                className="left-arrow"
                onClick={prevSlide}
              />
              <img
                src={prawoStrzalka}
                alt="Next"
                className="right-arrow"
                onClick={nextSlide}
              />
            </>
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
              {currentIndex} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
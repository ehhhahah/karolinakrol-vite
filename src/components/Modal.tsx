import React, { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  description?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, description }) => {
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
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300
            }}
            onClick={(e) => e.stopPropagation()}>
            <motion.button
              className='close-button'
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              &times;
            </motion.button>
            {children}
            {description && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {description}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal

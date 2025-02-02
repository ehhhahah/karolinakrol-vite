import React, { ReactNode } from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  description?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, description }) => {
  if (!isOpen) return null

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={onClose}>
          &times;
        </button>
        {children}
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

export default Modal
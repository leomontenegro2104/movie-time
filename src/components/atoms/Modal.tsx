import React, { useState, useEffect, useRef } from "react"

interface ModalProps {
  active: boolean
  id?: string
  children: React.ReactNode
}

interface ModalContentProps {
  onClose?: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ active, id, children }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(active)
  }, [active])

  return (
    <div
      id={id}
      className={`fixed inset-0 flex items-center justify-center bg-black/40 transition-opacity ${isActive ? "opacity-100 visible" : "opacity-0 invisible"
        } z-50`}
    >
      {children}
    </div>
  )
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose, children }) => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  const closeModal = () => {
    if (onClose) onClose()
  }

  return (
    <div
      ref={contentRef}
      className={`bg-white w-11/12 md:w-1/2 p-6 rounded-md shadow-lg transform transition-all duration-500 ${onClose ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10"
        } relative`}
    >
      {children}
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl">
        ✖
      </button>
    </div>
  )
}

export { Modal, ModalContent }

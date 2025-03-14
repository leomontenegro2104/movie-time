import React, { useState, useEffect, useRef } from 'react';

interface ModalProps {
  active: boolean;
  id: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active: isActive, id, children }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <div
      id={id}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${active ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      {children}
    </div>
  );
};

interface ModalContentProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ onClose, children }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    if (contentRef.current?.parentElement) {
      contentRef.current.parentElement.classList.remove('opacity-100', 'visible');
      contentRef.current.parentElement.classList.add('opacity-0', 'invisible');
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={contentRef}
      className="relative bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-lg w-full"
    >
      {children}
      <button
        className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-600 text-2xl"
        onClick={closeModal}
      >
        &times;
      </button>
    </div>
  );
};

export default Modal;

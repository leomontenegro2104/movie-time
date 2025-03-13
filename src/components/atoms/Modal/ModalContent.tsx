import React, { useRef } from "react";

interface ModalContentProps {
  onClose?: () => void;
  children: React.ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose, children }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    if (contentRef.current) {
      contentRef.current.parentElement?.classList.remove("active");
    }
    if (onClose) onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {children}
      <div className="modal__content__close" onClick={closeModal}>
        ✖
      </div>
    </div>
  );
};

export default ModalContent;

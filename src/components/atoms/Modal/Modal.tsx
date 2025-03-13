import React, { useState, useEffect, useRef } from 'react';
import './modal.scss';

interface ModalProps {
  active: boolean;
  id: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  );
};

interface ModalContentProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = (props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    if (contentRef.current?.parentElement) {
      contentRef.current.parentElement.classList.remove('active');
    }
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

export default Modal;

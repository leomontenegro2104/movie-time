import React, { useEffect, useState } from "react";
import "./modal.scss";

interface ModalProps {
  active: boolean;
  id?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, id, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <div id={id} className={`modal ${isActive ? "active" : ""}`}>
      {children}
    </div>
  );
};

export default Modal;

import React from "react";
import "./button.scss";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "small" | "large";
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = "", variant = "default", size = "large" }) => {
  return (
    <button
      className={`btn ${variant === "outline" ? "btn-outline" : ""} ${size === "small" ? "btn-small" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = (props) => <Button {...props} variant="outline" />;

export default Button;

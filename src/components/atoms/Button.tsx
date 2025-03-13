import React from "react"

interface ButtonProps {
  onClick?: () => void
  className?: string
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "small" | "large"
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = "", variant = "default", size = "large" }) => {
  const baseStyles = "font-bold rounded-lg transition-all duration-300"
  const defaultStyles = "bg-red-500 text-white border-4 border-transparent shadow-md hover:shadow-lg"
  const outlineStyles = "border-2 border-white text-white hover:bg-white hover:text-red-500"
  const sizeStyles = size === "small" ? "py-1 px-4 text-sm border-2" : "py-2 px-6 text-lg border-4"

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variant === "outline" ? outlineStyles : defaultStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const OutlineButton: React.FC<ButtonProps> = (props) => <Button {...props} variant="outline" />

export default Button

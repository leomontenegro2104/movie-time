import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`btn ${props.className || ''}`}
      onClick={props.onClick ? (e) => props.onClick && props.onClick(e) : undefined}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className || ''}`}
      onClick={props.onClick ? (e) => props.onClick && props.onClick(e) : undefined}
    >
      {props.children}
    </Button>
  );
};

export default Button;

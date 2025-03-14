import React from 'react';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`cursor-pointer font-[Montserrat] border-4 border-transparent bg-[#ff0000] text-white rounded-[30px] py-[0.5rem] px-[1.8rem] text-[1.5rem] font-semibold shadow-[0_0_7px_8px_#ff00004d] transition-shadow duration-300 ease-out relative hover:shadow-[0_0_7px_15px_#ff00004d] ${props.className || ''}`}
      onClick={props.onClick ? (e) => props.onClick!(e) : undefined}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      className={`border-[3px] border-solid border-white bg-transparent text-white shadow-none transition-colors duration-300 ease-out hover:text-[#ff0000] hover:bg-white ${props.className || ''}`}
      onClick={props.onClick ? (e) => props.onClick!(e) : undefined}
    >
      {props.children}
    </Button>
  );
};

export default Button;

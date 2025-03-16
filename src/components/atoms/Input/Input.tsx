import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-black text-white text-base px-6 py-2 rounded-lg font-montserrat border-0 outline-none ${className}`}
    />
  );
};

export default Input;

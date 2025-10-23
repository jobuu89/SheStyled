import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-lg text-white font-bold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
import React from "react";
import "./Button.css";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button className={`btn ${className ? className : ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

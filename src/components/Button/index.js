import React from "react";
import "./Button.css";

export const Button = ({ children, onClick }) => {
  return (
    <button className="btn btn--primary btn--wide blue" onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonSmall = ({ children, onClick }) => {
  return (
    <button className="btn btn--primary  blue" onClick={onClick}>
      {children}
    </button>
  );
};

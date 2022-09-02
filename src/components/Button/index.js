import React from "react";
import "./Button.css";

export const Button = ({ children, onClick }) => {
  return (
    <button className="btn btn--primary btn--wide blue" onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonA = ({ children, onClick }) => {
  return (
    <a
      style={{ textDecoration: "none" }}
      href="dapp://mint.u-topia.io"
      className="btn btn--primary btn--wide blue"
    >
      {children}
    </a>
  );
};

export const ButtonSmall = ({ children, onClick }) => {
  return (
    <button className="btn btn--primary  blue" onClick={onClick}>
      {children}
    </button>
  );
};

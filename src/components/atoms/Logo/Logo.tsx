import React from "react";
import { Link } from "react-router-dom";
import logo from "@src/assets/tmovie.png";
import "./logo.scss";

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" className="logo__image" />
      <Link to="/" className="logo__text">
        Movie Time
      </Link>
    </div>
  );
};

export default Logo;

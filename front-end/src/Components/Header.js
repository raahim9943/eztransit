import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../Assets/LOGO.svg";

export default function Header() {
  return (
    <div className="py-6">
      <Link to="/">
        <img src={LOGO} alt="logo" className="max-w-xs mx-auto" />
      </Link>
    </div>
  );
}
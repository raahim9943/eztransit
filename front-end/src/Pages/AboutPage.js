import React from "react";
//import { Link } from "react-router-dom";
import AM from "../Assets/AboutUsMeme.jpg";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">About EZTransit</h1>
      </div>
      <div className="flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <img src={AM} alt="logo" className="max-w-xs mx-auto" />
      </div>
    </div>
  );
}

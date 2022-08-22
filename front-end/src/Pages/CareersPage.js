import React from "react";
//import { Link } from "react-router-dom";
import CareerMeme from "../Assets/CareerMeme.jpg";

export default function CareersPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Find your dream job.
        </h1>
      </div>
      <div className="flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <img src={CareerMeme} alt="logo" className="max-w-xs mx-auto" />
      </div>
    </div>
  );
}

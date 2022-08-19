import React from "react";
import { Link } from "react-router-dom";
import HM1 from "../Assets/HelpMeme1.jpg";
import HM2 from "../Assets/HelpMeme2.jpg";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
        How can we help you?
        </h1>
      </div>
      <div className="flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <img src={HM1} alt="logo" className="max-w-xs mx-auto"/>
        <img src={HM2} alt="logo" className="max-w-xs mx-auto"/> 
      </div>
    </div>
  );
}
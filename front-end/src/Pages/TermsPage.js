import React from "react";
import TM from "../Assets/EverythingMeme.jpg";

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Everything you need to know, all in one place.
        </h1>
      </div>
      <div className="flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <img src={TM} alt="logo" className="max-w-xs mx-auto" />
      </div>
    </div>
  );
}

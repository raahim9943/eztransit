import React from "react";
//import { Link } from "react-router-dom";

export default function PassengerDashboard() {

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Admin Dashboard
        </h1>
      </div>
      <div className="flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <div className="p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">Driver 1</div>
        <div className="p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">Driver 2</div>
        <div className="p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">Driver 3</div>
      </div>
    </div>
  );
}
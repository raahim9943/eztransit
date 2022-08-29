import React from "react";
import { Link } from "react-router-dom";

export default function PasswordReset() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Password Reset
        </h1>
      </div>
      <div className="p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <form className="flex flex-col space-y-4 ">
          <input
            className="bg-[#D8DFE5] border-solid border-2 border-[#D8DFE5]"
            type="text"
            placeholder="Email"
          />
          <input
            className="bg-[#D8DFE5] border-solid border-2 border-[#D8DFE5]"
            type="Password"
            placeholder="New Password"
          />
          <input
            className="bg-[#D8DFE5] border-solid border-2 border-[#D8DFE5]"
            type="Password"
            placeholder="Confirm Password"
          />
          <button
            className="text-[#D8DFE5]"
            type="submit"
          >
            Reset
          </button>
        </form>
      </div>
      <Link to="/" className="text-lg font-medium text-[#D8DFE5] py-8">
        Don't have an account? Register
      </Link>
    </div>
  );
}
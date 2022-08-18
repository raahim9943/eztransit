import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Login
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
            type="text"
            placeholder="Password"
          />
          <button
            className="text-[#D8DFE5]"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <Link className="text-xs font-medium text-[#D8DFE5]" to="/PasswordReset">
        Forgotten Password?
      </Link>
      <button className="text-lg font-medium text-[#D8DFE5] py-8">
        Don't have an account? Register
      </button>
    </div>
  );
}
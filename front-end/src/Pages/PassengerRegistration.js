import React from "react";
import swal from "sweetalert";


export default function PassengerRegistration() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Passenger Registration
        </h1>
      </div>
      <div className="p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <form className="flex flex-col space-y-4 ">
          <input
            className="bg-[#D8DFE5] border-solid border-2 border-[#D8DFE5]"
            type="text"
            placeholder="Name"
          />
          <input
            className="bg-[#D8DFE5] border-solid border-2 border-[#D8DFE5]"
            type="text"
            placeholder="Email"
          />
          <input
            className="bg-[#D8DFE5] border-solid border-2 border-[#D8DFE5]"
            type="Password"
            placeholder="Password"
          />
          <input
            className="bg-[#D8DFE5] border-solid border-2 border-[#D8DFE5]"
            type="Password"
            placeholder="Confirm Password"
          />
          <button
            className="text-[#D8DFE5]"
            type="submit"
            onClick={swal({
              title: "Registration Successful",
              text: "Please proceed to the login page to log into your account",
              icon: "success",
              button: "OK",
            })}
          >
            Register
          </button>
        </form>
      </div>
      <button className="text-lg font-medium text-[#D8DFE5] py-8">
        Have an account? Log In
      </button>
    </div>
  );
}
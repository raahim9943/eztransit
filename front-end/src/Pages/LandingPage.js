import React from "react";
import { Link } from "react-router-dom";
import DriverLogo from "../Assets/DriverLogo.svg";
import PassengerLogo from "../Assets/PassengerLogo.svg";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Would you like to register as
        </h1>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
          <img
            className="max-w-[148px]"
            src={PassengerLogo}
            alt="passenger-logo"
          />
          <Link
            className="text-2xl font-medium text-[#D8DFE5] text-center"
            to="/PassengerRegistration"
          >
            Passenger
          </Link>
        </div>
        <div className="flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
          <img className="max-w-[148px]" src={DriverLogo} alt="driver-logo" />
          <Link
            className="text-2xl font-medium text-[#D8DFE5] text-center"
            to="/DriverRegistration"
          >
            Driver
          </Link>
        </div>
      </div>
      <Link className="text-lg font-medium text-[#D8DFE5] py-8" to="/LoginPage">
        Have an account? Log In
      </Link>
    </div>
  );
}

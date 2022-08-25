import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../Components/FormInput";

export default function LoginPage() {
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      //label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      //label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-12">
        <h1 className="text-2xl font-medium text-[#D8DFE5]">Login</h1>
      </div>
      <div className="p-12 space-y-2 border-solid border-2 border-[#D8DFE5]">
        <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Link
            className="text-[#D8DFE5] text-center"
            type="submit"
            to="/PassengerDashboard"
          >
            Login
          </Link>
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

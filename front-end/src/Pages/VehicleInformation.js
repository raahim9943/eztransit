import React, { useState } from "react";
//import swal from "sweetalert";
import FormInput from "../Components/FormInput";

export default function VehicleInformation() {
  const [values, setValues] = useState({
    name: "",
    model: "",
    number: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Manufacturer",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
      //label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "model",
      type: "text",
      placeholder: "Model",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
      //label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "number",
      type: "text",
      placeholder: "Car Number",
      errorMessage:
        "Car Number should be 3-16 characters and shouldn't include any special character!",
      //label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
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
        <h1 className="text-2xl font-medium text-[#D8DFE5]">
          Vehicle Information
        </h1>
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
          <button className="text-[#D8DFE5]">Register</button>
        </form>
      </div>
      <button className="text-lg font-medium text-[#D8DFE5] py-8">
        Have an account? Log In
      </button>
    </div>
  );
}

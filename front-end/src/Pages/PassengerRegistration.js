import React, { useState, useEffect } from "react"
import FormInput from "../Components/FormInput"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function PassengerRegistration({ user, setUser }) {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (user) {
      if (user.token) {
        if (user.userType) {
          navigate("/dashboard")
        } else {
          navigate("/")
        }
      }
    }
  }, [])

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
      //label: "Name",
      pattern:
        "^^(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      //label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      //label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      //label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    var options = {
      method: "POST",
      url: "//localhost:1337/api/auth/user/register",
      headers: { "Content-Type": "application/json" },
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        userType: false,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
        setUser({
          token: response.data.token,
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          userType: response.data.userType,
          profile: {},
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='py-12'>
        <h1 className='text-2xl font-medium text-[#D8DFE5]'>
          Passenger Registration
        </h1>
      </div>
      <div className='p-12 space-y-2 border-solid border-2 border-[#D8DFE5]'>
        <form className='flex flex-col space-y-4 ' onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className='text-[#D8DFE5]'>Register</button>
        </form>
      </div>
      <Link to='/LoginPage' className='text-lg font-medium text-[#D8DFE5] py-8'>
        Have an account? Log In
      </Link>
    </div>
  )
}

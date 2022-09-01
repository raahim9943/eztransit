import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import DriverLogo from "../Assets/DriverLogo.svg"
import PassengerLogo from "../Assets/PassengerLogo.svg"

export default function LandingPage({ user, setUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.token) {
        if (user.userType) {
          navigate("/dashboard/driver")
        } else {
          navigate("/dashboard/passenger")
        }
      } else {
        if (user.userType) {
          navigate("/register/driver")
        } else {
          navigate("/register/passenger")
        }
      }
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='py-12'>
        <h1 className='text-2xl font-medium text-[#D8DFE5]'>
          Would you like to register as
        </h1>
      </div>
      <div className='flex flex-row space-x-2'>
        <Link
          to='/register/passenger'
          onClick={() => {
            setUser({ userType: false })
          }}
        >
          <div className='flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]'>
            <img
              className='max-w-[148px]'
              src={PassengerLogo}
              alt='passenger-logo'
            />
            <span className='text-2xl font-medium text-[#D8DFE5] text-center'>
              Passenger
            </span>
          </div>
        </Link>
        <Link
          to='/register/driver'
          onClick={() => {
            setUser({ userType: true })
          }}
        >
          <div className='flex flex-col p-12 space-y-2 border-solid border-2 border-[#D8DFE5]'>
            <img className='max-w-[148px]' src={DriverLogo} alt='driver-logo' />
            <span className='text-2xl font-medium text-[#D8DFE5] text-center'>
              Driver
            </span>
          </div>
        </Link>
      </div>
      <Link className='text-lg font-medium text-[#D8DFE5] py-8' to='/login'>
        Have an account? Log In
      </Link>
    </div>
  )
}

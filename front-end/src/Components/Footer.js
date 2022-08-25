import React from "react"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full py-8 space-y-4'>
        <div className='flex flex-row items-center justify-center space-x-6 text-[#D8DFE5] text-base font-medium'>
          <Link to="/HelpPage">Help</Link>
          <Link to="/AboutPage">About</Link>
          <Link to="/TermsPage">Terms</Link>
          <Link to="/CareersPage">Careers</Link>
          <Link to="/ContactPage">Contact</Link>
        </div>
        <div className='text-[#D8DFE5] text-base font-medium'>
          ©2022 EZTransit
        </div>
      </div>
    </>
  )
}
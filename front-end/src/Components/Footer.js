import React from "react"

export default function Footer() {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full py-8 space-y-4'>
        <div className='flex flex-row items-center justify-center space-x-6 text-[#D8DFE5] text-base font-medium'>
          <button>Help</button>
          <button>About</button>
          <button>Terms</button>
          <button>Careers</button>
          <button>Contact</button>
        </div>
        <div className='text-[#D8DFE5] text-base font-medium'>
          ©2022 EZTransit
        </div>
      </div>
    </>
  )
}
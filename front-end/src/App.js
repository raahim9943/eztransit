import React from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import LandingPage from "./Pages/LandingPage"
import PassengerRegistration from "./Pages/PassengerRegistration"
import DriverRegistration from "./Pages/DriverRegistration"
import VehicleInformation from "./Pages/VehicleInformation"
import LoginPage from "./Pages/LoginPage"
import PasswordReset from "./Pages/PasswordReset"

function App() {
  return (
    <div class='flex flex-col min-h-screen justify-between bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]'>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="PassengerRegistration" element={<PassengerRegistration />} />
        <Route path="DriverRegistration" element={<DriverRegistration />} />
        <Route path="VehicleInformation" element={<VehicleInformation />} />
        <Route path="LoginPage" element={<LoginPage />} />
        <Route path="PasswordReset" element={<PasswordReset />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
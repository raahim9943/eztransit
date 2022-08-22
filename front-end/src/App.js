import React from "react"
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import LandingPage from "./Pages/LandingPage"
import PassengerRegistration from "./Pages/PassengerRegistration"
import DriverRegistration from "./Pages/DriverRegistration"
import VehicleInformation from "./Pages/VehicleInformation"
import LoginPage from "./Pages/LoginPage"
import PasswordReset from "./Pages/PasswordReset"
import PassengerDashboard from "./Pages/PassengerDashboard"
import HelpPage from "./Pages/HelpPage"
import AdminDashboard from "./Pages/AdminDashboard"
import AboutPage from "./Pages/AboutPage"
import CareersPage from "./Pages/CareersPage"
import ContactPage from "./Pages/ContactPage"
import TermsPage from "./Pages/TermsPage"

function App() {
  return (
    <ChakraProvider>
    <div class='flex flex-col min-h-screen justify-between bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]'>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="PassengerRegistration" element={<PassengerRegistration />} />
        <Route path="DriverRegistration" element={<DriverRegistration />} />
        <Route path="VehicleInformation" element={<VehicleInformation />} />
        <Route path="LoginPage" element={<LoginPage />} />
        <Route path="PasswordReset" element={<PasswordReset />} />
        <Route path="PassengerDashboard" element={<PassengerDashboard />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="HelpPage" element={<HelpPage />} />
        <Route path="AboutPage" element={<AboutPage />} />
        <Route path="TermsPage" element={<TermsPage />} />
        <Route path="ContactPage" element={<ContactPage />} />
        <Route path="CareersPage" element={<CareersPage />} />
      </Routes>
      <Footer />
    </div>
    </ChakraProvider>
  )
}

export default App
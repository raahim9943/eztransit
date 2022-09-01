import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LandingPage from "./Pages/LandingPage";
import PassengerRegistration from "./Pages/PassengerRegistration";
import DriverRegistration from "./Pages/DriverRegistration";
import VehicleInformation from "./Pages/VehicleInformation";
import LoginPage from "./Pages/LoginPage";
import PasswordReset from "./Pages/PasswordReset";
import PassengerDashboard from "./Pages/PassengerDashboard";
import HelpPage from "./Pages/HelpPage";
import DriverDashboard from "./Pages/DriverDashboard";
import AboutPage from "./Pages/AboutPage";
import CareersPage from "./Pages/CareersPage";
import ContactPage from "./Pages/ContactPage";
import TermsPage from "./Pages/TermsPage";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<LandingPage user={user} setUser={setUser} />}
        />
        <Route
          path="register/passenger"
          element={<PassengerRegistration user={user} setUser={setUser} />}
        />
        <Route
          path="register/driver"
          element={<DriverRegistration user={user} setUser={setUser} />}
        />
        <Route path="register/vehicle" element={<VehicleInformation />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="login/reset" element={<PasswordReset />} />
        <Route path="/dashboard/passenger" element={<PassengerDashboard />} />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="careers" element={<CareersPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

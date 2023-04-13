import { Routes, Route } from "react-router-dom"

import LandingPage from "./components/Home/LandingPage"
import Navbar from "./components/Navbar/Navbar"
import SignIn from "./components/Sign/SignIn"
import SignUp from "./components/Sign/SignUp"
import SignInOutContainer from "./components/Sign/Sign"
import ShowAdminBooks from "./pages/admin/showAdminBooks/showAdminBooks.pages"
import OtpForm from "./components/Sign/Otp/OtpForm"
import ForgotPassword from "./components/Forgot Password/ForgotPassword"
import NewPassword from "./components/New Password/NewPassword"

const LibraryRoutes = () => {
  return (
    <>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sign" element={<SignInOutContainer />} />
          <Route path="/admin-books" element={<ShowAdminBooks />} />
          <Route path="/confirm-otp" element={<OtpForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password/:id" element={<NewPassword />} />
        </Routes>
      </main>
    </>
  )
}

export default LibraryRoutes

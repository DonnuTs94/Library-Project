import { Routes, Route } from "react-router-dom"

import LandingPage from "./components/Home/LandingPage"
import Navbar from "./components/Navbar/Navbar"
import SignIn from "./components/Sign/SignIn"
import SignUp from "./components/Sign/SignUp"
import SignInOutContainer from "./components/Sign/Sign"
import ShowAdminBooks from "./pages/admin/showAdminBooks/showAdminBooks.pages"
import TrialHeadList from "./pages/admin/trial/TrialHeadList"

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
          <Route path="/trial" element={<TrialHeadList />} />
        </Routes>
      </main>
    </>
  )
}

export default LibraryRoutes

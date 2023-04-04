import {
  Avatar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Tabs,
  Typography,
} from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { Router, Routes } from "react-router-dom"
import LandingPage from "./components/Home/LandingPage"
import Navbar from "./components/Navbar/Navbar"
import SignIn from "./components/Sign/SignIn"
// import { Route, Routes } from "react-router-dom"
// import ShowAdminBooks from "./pages/admin/showAdminBooks/showAdminBooks.pages"
import LibraryRoutes from "./Routes"
import { useSignInWithEmail } from "../src/lib/signin/signInEmail"
import { useEffect } from "react"

function App() {
  const { keepUserLogIn } = useSignInWithEmail()
  useEffect(() => {
    keepUserLogIn()
  }, [])

  return (
    <>
      <LibraryRoutes />
      <Container>
        <CssBaseline />
      </Container>
    </>
    // <main>

    // </main>
  )
}

export default App

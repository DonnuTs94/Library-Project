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
import LibraryRoutes from "./Routes"

function App() {
  return (
    <>
      <LibraryRoutes />
    </>
    // <main>

    // </main>
  )
}

export default App

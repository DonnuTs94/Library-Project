import React from "react"
import OpeningPage from "./OpeningPage"
import HowItWorks from "./HowItWorks"
import BooksPage from "./BooksPage"
import { Box } from "@mui/material"

const LandingPage = () => {
  return (
    <Box>
      <OpeningPage />
      <HowItWorks />
      <BooksPage />
    </Box>
  )
}

export default LandingPage

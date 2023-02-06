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
import { Route, Router } from "react-router-dom"

function App() {
  return (
    <>
      <Container component="main" maxWidth="xs" border="1px solid black">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          border="1px solid black"
        >
          <Typography variant="h5">Sign Up</Typography>
        </Box>
      </Container>
    </>
  )
}

export default App

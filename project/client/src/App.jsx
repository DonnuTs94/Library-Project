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
// import { Route, Routes } from "react-router-dom"
// import ShowAdminBooks from "./pages/admin/showAdminBooks/showAdminBooks.pages"
import LibraryRoutes from "./Routes"

function App() {
  return (
    <>
      <Container>
        <CssBaseline />
        {/* <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          border="1px solid black"
        ></Box> */}
        {/* <Routes>
          <Route path="/admin-books" element={<ShowAdminBooks />} />
        </Routes> */}
        <LibraryRoutes />
      </Container>
    </>
  )
}

export default App

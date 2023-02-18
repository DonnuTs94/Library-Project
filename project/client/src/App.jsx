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
import { Route, Routes } from "react-router-dom"

import PaginationAdmin from "../src/components/admin/paginationAllBookAdmin/pagination.admin.component"

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
        <Routes>
          <Route path="/pagination" element={<PaginationAdmin />} />
        </Routes>
      </Container>
    </>
  )
}

export default App

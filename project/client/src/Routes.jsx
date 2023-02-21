import { Routes, Route } from "react-router-dom"
import ShowAdminBooks from "./pages/admin/showAdminBooks/showAdminBooks.pages"

const LibraryRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/admin-books" element={<ShowAdminBooks />} />
      </Routes>
    </>
  )
}

export default LibraryRoutes

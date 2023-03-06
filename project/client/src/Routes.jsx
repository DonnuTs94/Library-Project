import { Routes, Route } from "react-router-dom"
import Category from "./pages/admin/categories/Category"
// import AdminDashboard from "./pages/admin/Dashboard"

const LibraryRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin/categories" element={<Category />} />
      </Routes>
    </>
  )
}

export default LibraryRoutes

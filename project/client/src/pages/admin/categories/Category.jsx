import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material"
import { API } from "../../../api"
import CreateFormModal from "../../../components/admin/categories/CreateFormModal"
import DialogDelete from "../../../components/admin/categories/DialogDelete"
import EditFormModal from "../../../components/admin/categories/EditFormModal"

const Category = () => {
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(
    parseInt(sessionStorage.getItem("categoryPage")) || 0
  )
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/categories?page=1&limit=${total}`)
        setCategories(response.data.data)
        setTotal(response.data.total)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [total])

  useEffect(() => {
    sessionStorage.setItem("categoryPage", page)
  }, [page])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const visibleCategories = categories.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  )

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "100%", overflow: "hidden", width: "100%" }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleCategories.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.category_name}</TableCell>
                    <TableCell>
                      <EditFormModal
                        id={category.id}
                        category={category.category_name}
                      />
                      <DialogDelete
                        id={category.id}
                        category={category.category_name}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <CreateFormModal />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </div>
    </>
  )
}

export default Category

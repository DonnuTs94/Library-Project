import { useEffect, useState } from "react"
import { API } from "../../api"
import Pagination from "@mui/material/Pagination"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ImageList,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useSearchParams } from "react-router-dom"

const PaginationAdmin = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [showTruncate, setShowTruncate] = useState(true)
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 0
  )
  const [rowPerPage, setRowPerPage] = useState(5)

  // console.log(currentPage)

  const columns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "author", label: "Author", minWidth: 170, align: "center" },
    { id: "description", label: "Description", minWidth: 170, align: "center" },
    { id: "category", label: "Category", minWidth: 170, align: "center" },
    { id: "book images", label: "Book Images", minWidth: 170, align: "center" },
    { id: "edit", label: "Edit", minWidth: 170, align: "center" },
    { id: "delete", label: "Delete", minWidth: 170, align: "center" },
  ]

  const truncate = (input) =>
    input.length > 40 ? `${input.substring(0, 40)}...` : input

  const handleChangeRowsPerPage = (event) => {
    // setRowPerPage(+event.target.value)
    setCurrentPage(0)
  }

  const handlePage = (event, newPage) => {
    setCurrentPage(newPage)
    // console.log(newPage)
  }

  const foundAllBooks = async (page = 1) => {
    try {
      const response = await API.get(`/api/admin-books/`)
      setBooks(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(books)
  // console.log(pagination)

  useEffect(() => {
    foundAllBooks()
    //   window.localStorage.setItem("Pagination", JSON.stringify(books, pagination))
  }, [])

  useEffect(() => {
    setSearchParams({ page: currentPage })
  }, [currentPage, setSearchParams])
  // useEffect(() => {
  //   window.localStorage.setItem("currentPage", JSON.stringify(currentPage))
  // }, [currentPage])

  // useEffect(() => {
  //   const pageNow = window.localStorage.getItem("currentPage")
  //   if (pageNow !== null) setCurrentPage(JSON.parse(pageNow))
  // }, [])

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.align}
                    style={{ minWidth: col.minWidth }}
                    sx={{ fontWeight: "bold" }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books
                .slice(
                  currentPage * rowPerPage,
                  currentPage * rowPerPage + rowPerPage
                )
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {/* {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })} */}
                      <TableCell>{row.title}</TableCell>
                      <TableCell align="center">{row.author}</TableCell>
                      <TableCell align="center">
                        {showTruncate
                          ? truncate(row.description)
                          : row.description}
                      </TableCell>
                      <TableCell align="center">
                        {row.Category.category_name}
                      </TableCell>
                      <TableCell>
                        <CardMedia
                          component="img"
                          sx={{
                            height: "auto",
                            width: 50,
                            display: "block",
                            margin: "0 auto",
                          }}
                          image={row.Book_Pictures[0].book_picture}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <EditIcon color="info" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={books.length}
          rowsPerPage={rowPerPage}
          page={currentPage}
          onPageChange={handlePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default PaginationAdmin

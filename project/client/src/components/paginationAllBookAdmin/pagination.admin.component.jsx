import { useEffect, useState } from "react"
import { API } from "../../api"
import {
  CardMedia,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useSearchParams } from "react-router-dom"
import Carousel from "react-material-ui-carousel"

const PaginationAdmin = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [showTruncate, setShowTruncate] = useState(true)
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 0
  )

  const [rowPerPage, setRowPerPage] = useState(
    parseInt(searchParams.get("row")) || 5
  )

  const columns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "author", label: "Author", minWidth: 170, align: "center" },
    { id: "category", label: "Category", minWidth: 170, align: "center" },
    { id: "description", label: "Description", minWidth: 170, align: "center" },
    { id: "book images", label: "Book Images", minWidth: 170, align: "center" },
    { id: "edit", label: "Edit", minWidth: 170, align: "center" },
    { id: "delete", label: "Delete", minWidth: 170, align: "center" },
  ]

  const truncate = (input) =>
    input.length > 40 ? `${input.substring(0, 40)} ...` : input

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value)
    setCurrentPage(0)
  }

  const handlePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const foundAllBooks = async () => {
    try {
      const response = await API.get(`/api/admin-books/`)
      setBooks(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    foundAllBooks()
  }, [])

  useEffect(() => {
    setSearchParams({ page: currentPage, row: rowPerPage })
  }, [currentPage, rowPerPage, setSearchParams])

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
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#39B5E0",
                      color: "white",
                    }}
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
                      <TableCell>{row.title}</TableCell>
                      <TableCell align="center">{row.author}</TableCell>
                      <TableCell align="center">
                        {row.Category.category_name}
                      </TableCell>
                      <TableCell align="center">
                        {showTruncate
                          ? truncate(row.description)
                          : row.description}
                      </TableCell>
                      <TableCell>
                        <Carousel autoPlay={false} animation="fade">
                          {row.Book_Pictures.map((val) => (
                            <CardMedia
                              component="img"
                              sx={{
                                height: "auto",
                                minHeight: "100%",
                                width: 60,
                                display: "block",
                                margin: "0 auto",
                              }}
                              image={val.book_picture}
                            />
                          ))}
                        </Carousel>
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
          rowsPerPageOptions={[5, 10, 15]}
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

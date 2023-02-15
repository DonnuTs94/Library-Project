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

const PaginationAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [books, setBooks] = useState([])
  const [showTruncate, setShowTruncate] = useState(true)

  const truncate = (input) =>
    input.length > 40 ? `${input.substring(0, 40)}...` : input

  const foundAllBooks = async (page = 1) => {
    try {
      const response = await API.get(`/api/admin-books/?page=${page}&record=6`)
      setBooks(response.data.data)
      setPagination(response.data.pagination)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(books)
  console.log(pagination)

  const handlePage = (event, value) => {
    event.preventDefault()
    setCurrentPage(value)
    foundAllBooks(value)
  }
  useEffect(() => {
    foundAllBooks()
    //   window.localStorage.setItem("Pagination", JSON.stringify(books, pagination))
  }, [])
  return (
    <>
      {/* <Box display="grid" gap="10px" gridTemplateColumns="repeat(3, 1fr)">
        {books.map((val) => (
          <Card sx={{ maxWidth: 345, border: "1px solid red", paddingTop: 2 }}>
            <CardMedia
              component="img"
              sx={{
                height: "auto",
                width: 180,
                display: "block",
                margin: "0 auto",
              }}
              image={val.Book_Pictures[0].book_picture}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" component="div">
                {val.title}
              </Typography>
              <Typography variant="h6" component="div">
                {val.author}
              </Typography>
              <Typography variant="body2">
                {showTruncate ? truncate(val.description) : val.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Pagination
        count={pagination.totalPage}
        page={currentPage}
        onChange={handlePage}
        color="primary"
        sx={{ justifyContent: "center", display: "flex", bottom: "0" }}
      /> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Books Img</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((val) => (
              <TableRow>
                <TableCell>{val.title}</TableCell>
                <TableCell align="center">{val.author}</TableCell>
                <TableCell align="center">
                  {showTruncate ? truncate(val.description) : val.description}
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
                    image={val.Book_Pictures[0].book_picture}
                  />
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination onPageChange={handlePage} />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default PaginationAdmin

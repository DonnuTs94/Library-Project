import { useEffect, useState } from "react"
import { API } from "../../../api"
import {
  Button,
  CardMedia,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useSearchParams } from "react-router-dom"
import Carousel from "react-material-ui-carousel"
import TableHeadList from "../../../components/admin/tableHeadList/TableHeadList.component"
import { Box } from "@mui/system"

const ShowAdminBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [displayBooks, setDisplayBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || null
  )
  const [categories, setCategories] = useState([])
  const [order, setOrder] = useState(searchParams.get("order") || "asc")
  const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") || "")
  const [showTruncate, setShowTruncate] = useState(true)
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 0
  )
  const [rowPerPage, setRowPerPage] = useState(
    parseInt(searchParams.get("row")) || 5
  )

  // console.log(displayBooks)
  // console.log(books)
  const truncate = (input) =>
    input.length > 40 ? `${input.substring(0, 40)}` : input

  const descComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descComparator(a, b, orderBy)
      : (a, b) => -descComparator(a, b, orderBy)
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  const foundAllBooks = async () => {
    try {
      const response = await API.get(`/api/admin-books/`)
      // console.log(response)
      setBooks(response.data.data)
      setDisplayBooks(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const foundAllCategories = async () => {
    try {
      const categoriesResponse = await API.get("api/admin-books/categories/")
      setCategories(categoriesResponse.data.data)
    } catch (err) {
      console.log(err)
    }
    // console.log(categories)
  }

  // console.log(categories)
  const handleRequestShort = (event, prop) => {
    const isAsc = orderBy === prop && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(prop)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value)
    setCurrentPage(0)
  }

  const handlePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const categoriesChangeHandler = (event) => {
    // console.log(event.target.value)
    // console.log(books[0])

    // const filterBooks = books.filter((book) => {
    //   return book.CategoryId === event.target.value
    // })
    // setDisplayBooks(filterBooks)
    // console.log(filterBooks)

    setSelectedCategory(event.target.value)
  }

  // console.log(displayBooks)
  useEffect(() => {
    foundAllBooks()
    foundAllCategories()
  }, [])

  useEffect(() => {
    setSearchParams({
      page: currentPage,
      row: rowPerPage,
      order: order,
      orderBy: orderBy,
    })
  }, [currentPage, rowPerPage, order, orderBy, setSearchParams])

  useEffect(() => {
    if (selectedCategory === null) {
      return
    }
    // const filterBooks = books.filter((book) => {
    //   return book.CategoryId === selectedCategory
    // })
    console.log(selectedCategory)
    setDisplayBooks(books)

    searchParams.set("category", selectedCategory)
    setSearchParams(searchParams)
  }, [selectedCategory, books, searchParams, setSearchParams])

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <GridToolbarFilterButton onChange={handleFilterChange} /> */}
        {/* <FormControl> */}
        <div>
          {categories.map((val) => (
            <MenuItem
              value={val.id}
              key={val.id}
              onClick={categoriesChangeHandler}
            >
              {val.category_name}
            </MenuItem>
          ))}
        </div>
        {/* </FormControl> */}
        <TableContainer>
          <Table size="medium">
            <TableHeadList
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestShort}
              rowCount={displayBooks.length}
            />
            <TableBody>
              {stableSort(displayBooks, getComparator(order, orderBy))
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
                        <Tooltip title={row.description}>
                          <span style={{ cursor: "pointer" }}> ...</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Carousel
                          indicators={false}
                          autoPlay={false}
                          animation="fade"
                        >
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
          count={displayBooks.length}
          rowsPerPage={rowPerPage}
          page={currentPage}
          onPageChange={handlePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default ShowAdminBooks

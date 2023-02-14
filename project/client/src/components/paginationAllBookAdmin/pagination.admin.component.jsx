import { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import Pagination from "@mui/material/Pagination"
import { Box, Card, CardMedia, ImageList } from "@mui/material"

const PaginationAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [Books, setBooks] = useState([])

  const foundAllBooks = async (page = 1) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin-books/?page=${page}&record=3`
      )
      setBooks(response.data.data)
      setPagination(response.data.pagination)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(Books)

  const handlePage = (event, value) => {
    event.preventDefault()
    setCurrentPage(value)
    foundAllBooks(value)
  }
  useEffect(() => {
    localStorage.getItem(foundAllBooks())
  }, [])
  return (
    <>
      <Box>
        {Books.map((val) => (
          <Card>
            <ImageList>
              <img src={val.Book_Pictures[0].book_picture} />
            </ImageList>
            <h1>{val.title}</h1>
            <h2>{val.author}</h2>
            <h3>{val.description}</h3>
          </Card>
        ))}
        <Pagination
          count={pagination.totalPage}
          page={currentPage}
          onChange={handlePage}
          color="primary"
        />
      </Box>
    </>
  )
}

export default PaginationAdmin

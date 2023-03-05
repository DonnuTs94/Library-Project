import { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { CardMedia, IconButton } from "@mui/material"
import { API } from "../../../api"
import Carousel from "react-material-ui-carousel"

const TrialHeadList = () => {
  const [displayBooks, setDisplayBooks] = useState([])

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 170 },
    { field: "author", headerName: "Author", width: 170 },
    {
      field: "category_name",
      headerName: "Category",
      width: 170,
      valueGetter: (params) => params.row.Category.category_name,
    },
    { field: "description", headerName: "Description", width: 170 },
    {
      field: "Book_Pictures",
      headerName: "Pictures",
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const images = params.row.Book_Pictures?.map((picture) => (
          <CardMedia
            key={picture.id}
            component="img"
            alt={params.row.title}
            sx={{
              height: "auto",
              minHeight: "100%",
              width: 60,
              display: "block",
              margin: "0 auto",
            }}
            image={picture.book_picture}
          />
        ))

        return (
          <Carousel animation="fade">
            {images.map((image) => (
              <div key={image.key}>{image}</div>
            ))}
          </Carousel>
        )
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      filterable: false,
      width: 170,
      renderCell: (params) => {
        const handleEdit = async () => {
          try {
            // Make API call to edit book
            const response = await API.put(
              `/api/admin-books/${params.row.id}`,
              {
                title: "new title",
                author: "new author",
                category_id: 1,
                description: "new description",
              }
            )
            console.log(response.data)
            // Update displayBooks with the edited book
            setDisplayBooks((prevBooks) => {
              const index = prevBooks.findIndex(
                (book) => book.id === params.row.id
              )
              const newBooks = [...prevBooks]
              newBooks[index] = response.data.data
              return newBooks
            })
          } catch (err) {
            console.log(err)
          }
        }
        return (
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      filterable: false,
      sortable: false,
      width: 170,
      renderCell: (params) => {
        const handleDelete = async () => {
          try {
            // Make API call to delete book
            await API.delete(`/api/admin-books/${params.row.id}`)
            console.log("Book deleted")
            // Update displayBooks by removing the deleted book
            setDisplayBooks((prevBooks) =>
              prevBooks.filter((book) => book.id !== params.row.id)
            )
          } catch (err) {
            console.log(err)
          }
        }
        return (
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )
      },
    },
  ]

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await API.get(`/api/admin-books/`)
        setDisplayBooks(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchBooks()
  }, [])

  const rowsPerPageOptions = [5, 10, 20]
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={displayBooks}
        columns={columns}
        pageSize={10}
        pagination
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </div>
  )
}

export default TrialHeadList

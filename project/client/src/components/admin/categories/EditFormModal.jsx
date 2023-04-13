import * as React from "react"
import { API } from "../../../api"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useFormik } from "formik"
import * as Yup from "yup"

const EditFormModal = ({ id, category }) => {
  // Dialog Functionality
  const [open, setOpen] = React.useState()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Alert Snackbar Warning
  const [snackbarOpen, setSnackbarOpen] = React.useState()
  const openSnackbar = () => setSnackbarOpen(true)
  const closeSnackbar = () => setSnackbarOpen(false)

  const editCategory = useFormik({
    initialValues: {
      category_name: "",
    },
    onSubmit: async ({ category_name }) => {
      try {
        if (!category_name) {
          openSnackbar()
          return
        }

        await API.patch(`/categories/${id}`, { category_name })
        handleClose()
        window.location.reload()
      } catch (err) {
        console.error(err)
      }
    },
    validationSchema: Yup.object({
      category_name: Yup.string().required("Category still empty"),
    }),
    validateOnChange: false,
  })

  const editChange = ({ target }) => {
    const { name, value } = target
    editCategory.setFieldValue(name, value)
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Edit">
          <EditIcon />
        </Tooltip>
      </IconButton>

      <Dialog open={open}>
        <DialogTitle>Edit Category</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            name="category_name"
            onChange={editChange}
            placeholder={category}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={editCategory.handleSubmit}
          >
            Edit
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} onClose={closeSnackbar}>
        <Alert
          onClose={closeSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Category field cannot be empty!
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditFormModal

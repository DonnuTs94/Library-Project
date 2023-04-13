import * as React from "react"
import { Modal, Typography, Button, Box, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { API } from "../../../api"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const CreateFormModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    onSubmit: async ({ category_name }) => {
      try {
        await API.post("/categories/create", { category_name })
        handleClose()
        window.location.reload(false)
      } catch (err) {
        console.error(err)
      }
    },
    validationSchema: Yup.object({
      category_name: Yup.string().required("category name still empty"),
    }),
  })
  const formChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button
          color="primary"
          disabled={false}
          size="small"
          variant="contained"
          onClick={handleOpen}
        >
          Add Category
        </Button>
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a new category
            </Typography>

            <TextField
              id="category"
              label="Category"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              name="category_name"
              onChange={formChange}
              value={formik.values.category_name}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Add
              </Button>
              <Button
                onClick={handleClose}
                color="error"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  )
}

export default CreateFormModal

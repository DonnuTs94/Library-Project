import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../api";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  width: 400,
  backgroundColor: "white",
  p: 3,
  borderRadius: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  description: Yup.string().required("Description is required"),
  categoryId: Yup.number().required("Category is required"),
  stock: Yup.number().required("Stock is required"),
  picture: Yup.mixed()
    .required("Pictures are required")
    .test("fileSize", "File too large", (value) => {
      if (!value) return true; // allow empty pictures array
      return value.reduce((acc, file) => acc && file.size <= 1000000, true);
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true; // allow empty pictures array
      return value.reduce(
        (acc, file) =>
          acc && ["image/jpeg", "image/png", "image/gif"].includes(file.type),
        true
      );
    }),
});
const CreateFormModal = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  // const [previewImage, setPreviewImage] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      categoryId: "",
      stock: "",
      picture: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author", values.author);
        formData.append("description", values.description);
        formData.append("categoryId", values.categoryId);
        formData.append("stock", values.stock);

        if (values.picture) {
          const pictureData = Array.isArray(values.picture)
            ? values.picture.map((picture) => picture)
            : [values.picture]; // Convert single value to array
          pictureData.forEach((picture) => {
            formData.append("pictures", picture);
          });
        }
        const response = await API.post("/api/admin-books/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to create book: internal server error");
      }
    },
  });

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

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
          Add Books
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
              Create Book Data
            </Typography>

            {errorMessage && <div>{errorMessage}</div>}
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              sx={{ mb: 2 }}
            />
            <FormControl
              error={
                formik.touched.categoryId && Boolean(formik.errors.categoryId)
              }
              fullWidth
              sx={{ mb: 2 }}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="categoryId"
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
              >
                {categories.data &&
                  categories.data.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
              </Select>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <div sx={{ color: "red" }}>{formik.errors.categoryId}</div>
              )}
            </FormControl>
            <TextField
              fullWidth
              id="stock"
              name="stock"
              label="Stock"
              type="number"
              value={formik.values.stock}
              onChange={formik.handleChange}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Pictures
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={
                    formik.touched.picture && Boolean(formik.errors.picture)
                  }
                  fullWidth
                >
                  <Input
                    type="file"
                    id="picture"
                    name="picture"
                    inputProps={{ multiple: true }}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "pictures",
                        event.currentTarget.files
                      );
                    }}
                  />
                  {formik.touched.picture && formik.errors.picture && (
                    <FormHelperText>{formik.errors.picture}</FormHelperText>
                  )}
                  {formik.values.picture &&
                    Array.from(formik.values.picture).map((file, index) => (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          height="100"
                        />
                        <IconButton
                          onClick={() => {
                            const pictures = Array.from(formik.values.picture);
                            pictures.splice(index, 1);
                            formik.setFieldValue("pictures", pictures);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
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
  );
};

export default CreateFormModal;

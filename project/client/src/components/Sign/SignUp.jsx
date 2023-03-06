import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { CheckBox } from "@mui/icons-material"
import { useEffect } from "react"

import { API } from "../../api"
import { useFormik } from "formik"
import * as Yup from "yup"

const SignUp = () => {
  const paperStyle = {
    padding: 20,
    height: "75vh",
    width: "40vh",
    margin: "0 auto",
    marginTop: "50px",
  }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: "#1e81b0" }
  const marginTop = { marginTop: 5 }

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      gender: "",
    },
    onSubmit: async ({ email, username, password, gender }) => {
      try {
        const response = await API.post("/auth/register", {
          email,
          username,
          password,
          gender,
        })
        formik.setFieldValue({
          email: "",
          username: "",
          password: "",
          gender: "",
        })
      } catch (err) {
        return err.response
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email address").email(),
      username: Yup.string().required("Please enter your username"),
      password: Yup.string()
        .required("Please enter your new password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h1 style={headerStyle}> Sign Up</h1>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            sx={{
              paddingBottom: "10px",
            }}
            onChange={handleChange}
            name="username"
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
          <FormControl component={"fieldset"} style={marginTop}>
            <FormLabel component={"legend"}>Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              onChange={handleChange}
              style={{ display: "initial" }}
            >
              <FormControlLabel
                value={"female"}
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value={"male"}
                control={<Radio />}
                label="Male"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            sx={{
              paddingBottom: "10px",
            }}
            onChange={handleChange}
            name="password"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
            sx={{
              paddingBottom: "10px",
            }}
            onChange={handleChange}
            name="password"
          />
          <FormControlLabel
            control={<CheckBox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}
export default SignUp

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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { CheckBox } from "@mui/icons-material"
import { useSignUpFormik } from "../../lib/register/formikConfig2"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { Link } from "react-router-dom"

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

  const { formik, handleChange } = useSignUpFormik()

  const [showSnackBar, setShowSnackbar] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setShowSnackbar(false)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault()
    formik.handleSubmit()
    setShowSnackbar(true)
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
        <form onSubmit={handleFormSubmit}>
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
          {/* <Link to={"/confirm-otp"}> */}
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
          {/* </Link> */}
          <Snackbar
            open={showSnackBar}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </Grid>
  )
}
export default SignUp

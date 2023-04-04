import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import LockIcon from "@mui/icons-material/Lock"
import { CheckBox } from "@mui/icons-material"
import GoogleIcon from "@mui/icons-material/Google"
import { Link } from "react-router-dom"
import { useSignInWithEmail } from "../../lib/signin/signInEmail"
import { useState } from "react"
import { useEffect } from "react"

const SignIn = () => {
  const { formik, handleChange, alertMessage2, alertSeverity2, keepUserLogIn } =
    useSignInWithEmail()
  const handleFormSubmit = (event) => {
    event.preventDefault()
    formik.handleSubmit()
  }
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  // useEffect(() => {
  //   keepUserLogIn()
  // }, [])

  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: "40vh",
    margin: "0 auto",
    marginTop: "50px",
  }
  const avatarStyle = { backgroundColor: "#1e81b0" }
  const btnstyle = { margin: "8px 0" }
  return (
    <>
      {" "}
      <Grid>
        <Paper style={paperStyle}>
          <form onSubmit={handleFormSubmit}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="email"
              name="email"
              placeholder="Enter email"
              fullWidth
              required
              sx={{
                paddingBottom: "10px",
              }}
              value={formik.values.email}
              onChange={handleChange}
            />
            <TextField
              label="password"
              name="password"
              placeholder="Enter password"
              fullWidth
              required
              value={formik.values.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={handleClick}
            >
              Sign In
            </Button>
          </form>
          {alertMessage2 && (
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity={alertSeverity2}>
                <AlertTitle>{alertSeverity2}</AlertTitle>
                {alertMessage2}
              </Alert>
            </Snackbar>
          )}
          <Typography textAlign={"center"} color="gray">
            Or
          </Typography>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            <GoogleIcon
              sx={{
                paddingRight: "5px",
              }}
            />
            Sign In with Google
          </Button>
          <Typography>
            <Link to={"#"}>Forgot password ?</Link>
          </Typography>
          <Typography>
            Do you have an account ?
            <Link to={"/signup"} onClick={() => handleChange("event", 1)}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  )
}

export default SignIn

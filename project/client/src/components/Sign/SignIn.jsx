import {
  Avatar,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import LockIcon from "@mui/icons-material/Lock"
import { CheckBox } from "@mui/icons-material"
import GoogleIcon from "@mui/icons-material/Google"
import { Link } from "react-router-dom"

const SignIn = ({ handleChange }) => {
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
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            label="username"
            placeholder="Enter username"
            fullWidth
            required
            sx={{
              paddingBottom: "10px",
            }}
          />
          <TextField
            label="password"
            placeholder="Enter password"
            fullWidth
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign In
          </Button>
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

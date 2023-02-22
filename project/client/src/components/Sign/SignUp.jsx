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
        <form>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            sx={{
              paddingBottom: "10px",
            }}
          />
          <TextField fullWidth label="Email" placeholder="Enter your email" />
          <FormControl component={"fieldset"} style={marginTop}>
            <FormLabel component={"legend"}>Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
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
          {/* <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
          /> */}
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            sx={{
              paddingBottom: "10px",
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
            sx={{
              paddingBottom: "10px",
            }}
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

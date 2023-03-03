import React from "react"

import {
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  Box,
} from "@mui/material"
import OtpInput from "./OtpInput"

const OtpForm = () => {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: "40vh",
    margin: "0 auto",
    marginTop: "50px",
  }
  const paperStyle2 = {
    padding: 20,
    height: "60vh",
    width: "80vh",
    margin: "0 auto",
    marginTop: "50px",
  }
  const headerStyle = { margin: 0 }
  return (
    <Grid>
      <Paper
        sx={{
          height: { md: "40vh", xs: "60vh" },
          width: { md: "80vh", xs: "50vh" },
          margin: "0 auto",
          marginTop: "50px",
        }}
      >
        <Grid align="center" marginBottom={"20px"}>
          <h1 style={headerStyle}>Confirm OTP</h1>
          <Typography
            variant="caption"
            gutterBottom
            fontSize={{ md: "15px", xs: "10px" }}
            fontWeight="lighter"
          >
            Input your OTP Number
          </Typography>
        </Grid>
        <OtpInput />
      </Paper>
    </Grid>
  )
}

export default OtpForm

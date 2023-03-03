import React from "react"

import {
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  Box,
  Button,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

const OtpInput = () => {
  return (
    <Grid
      sx={{
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        maxWidth: "500px",
        // border: "2px solid red",
      }}
      container
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: { md: "30px", xs: "10px" },
          marginBottom: "20px",
        }}
        container
        spacing={{ md: 3, xs: 0.5 }}
      >
        <Grid item width={{ md: "100px", xs: "60px" }}>
          <OutlinedInput
            inputProps={{
              maxLength: 1,
              pattern: "^[0-9]*[a-zA-Z]?[0-9]*$",
            }}
            style={{
              textAlign: "center",
              fontSize: "25px",
              textAlignLast: "center",
              fontWeight: "bolder",
            }}
          />
        </Grid>
        <Grid item width={{ md: "100px", xs: "60px" }}>
          <OutlinedInput
            inputProps={{
              maxLength: 1,
              pattern: "^[0-9]*[a-zA-Z]?[0-9]*$",
            }}
            style={{
              textAlign: "center",
              fontSize: "25px",
              textAlignLast: "center",
              fontWeight: "bolder",
            }}
          />
        </Grid>
        <Grid item width={{ md: "100px", xs: "60px" }}>
          <OutlinedInput
            inputProps={{
              maxLength: 1,
              pattern: "^[0-9]*[a-zA-Z]?[0-9]*$",
            }}
            style={{
              textAlign: "center",
              fontSize: "25px",
              textAlignLast: "center",
              fontWeight: "bolder",
            }}
          />
        </Grid>
        <Grid item width={{ md: "100px", xs: "60px" }}>
          <OutlinedInput
            inputProps={{
              maxLength: 1,
              pattern: "^[0-9]*[a-zA-Z]?[0-9]*$",
            }}
            style={{
              textAlign: "center",
              fontSize: "25px",
              textAlignLast: "center",
              fontWeight: "bolder",
            }}
          />
        </Grid>
        <Grid item width={{ md: "100px", xs: "60px" }}>
          <OutlinedInput
            inputProps={{
              maxLength: 1,
              pattern: "^[0-9]*[a-zA-Z]?[0-9]*$",
            }}
            style={{
              textAlign: "center",
              fontSize: "25px",
              textAlignLast: "center",
              fontWeight: "bolder",
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          fontSize: { md: "20px", xs: "10px" },
          fontWeight: "bolder",
          borderRadius: "10px",
        }}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Grid>
  )
}

export default OtpInput

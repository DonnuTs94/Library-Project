import React from "react"

import {
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  Box,
  Button,
  TextField,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
// import { otpVerif } from "../../../lib/register/otpVerif"
import { useFormik } from "formik"
import { API } from "../../../api"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { useOtpFormik } from "../../../lib/register/otpVerif"

const OtpInput = (id) => {
  const { formik, handleChange } = useOtpFormik()
  const handleFormSubmit = (event) => {
    event.preventDefault()
    formik.handleSubmit()
  }

  return (
    <Grid
      sx={{
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        maxWidth: "500px",
      }}
      container
    >
      <form onSubmit={handleFormSubmit}>
        <TextField
          onChange={handleChange}
          name="otpInput"
          type={"number"}
          sx={{
            textAlign: "center",
          }}
        />
        <br />
        <Button
          variant="contained"
          sx={{
            fontSize: { md: "20px", xs: "10px" },
            fontWeight: "bolder",
            borderRadius: "10px",
            marginTop: "20px",
            justifyContent: "center",
            align: "center",
            alignItems: "center",
          }}
          endIcon={<SendIcon />}
          type="submit"
        >
          Send
        </Button>
      </form>
    </Grid>
  )
}

export default OtpInput

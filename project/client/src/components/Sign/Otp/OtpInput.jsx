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
// import { otpVerif } from "../../../lib/register/otpVerif"
import { useFormik } from "formik"
import { API } from "../../../api"
import { Link } from "react-router-dom"

const OtpInput = (id) => {
  //   const { formik, handleChange } = otpVerif()
  //   const handleFormSubmit = (event) => {
  //     event.preventDefault()
  //     formik.handleSubmit()
  //   }

  const formik = useFormik({
    initialValues: {
      otpInput: "",
    },
    onSubmit: async ({ otpInput }) => {
      try {
        const response = await API.post(`/auth/verify/${id}`, {
          otpInput,
        })
        formik.setFieldValue("otpInput", "")
      } catch (err) {
        return err.response
      }
    },
  })
  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      onChange={handleChange}
      name="otpInput"
    >
      <Grid
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          maxWidth: "500px",
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
          type="submit"
        >
          Send
        </Button>
      </Grid>
    </form>
  )
}

export default OtpInput

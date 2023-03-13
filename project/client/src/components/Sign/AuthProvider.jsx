// import React, { createContext, useState } from "react"
// import { API } from "../../api"

// export const AuthContext = createContext({})

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [user, setUser] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const registerUser = async (userData) => {
//     setIsLoading(true)
//     try {
//       const res = await API.post("/auth/register", userData)
//       setIsAuthenticated(true)
//       setUser(res.data.user)
//     } catch (err) {
//       console.log(err)
//     }
//     setIsLoading(false)
//   }

//   const verifyOtp = async (otpInput, email) => {
//     setIsLoading(true)
//     try {
//       const res = await API.post("/auth/verify", { otpInput, email })
//       setIsAuthenticated(true)
//       setUser(res.data.user)
//     } catch (err) {
//       console.log(err)
//     }
//     setIsLoading(false)
//   }

//   const requestOtp = async (email) => {
//     setIsLoading(true)
//     try {
//       await API.post("/auth/new-verify", { email })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const values = {
//     isAuthenticated,
//     user,
//     isLoading,
//     registerUser,
//     verifyOtp,
//     requestOtp,
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
// }

// export default AuthProvider

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
import { useFormik } from "formik"
import { API } from "../../../api"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { useSelector } from "react-redux"

const OtpInput = (id) => {
  const selector = useSelector((state) => state.auth)

  const formik = useFormik({
    initialValues: {
      email: selector.email,
      otpInput: "",
    },
    onSubmit: async ({ otpInput }) => {
      try {
        const response = await API.post("/auth/verify", {
          otpInput,
          email: selector.email,
        })
        formik.setFieldValue("otpInput", "")
      } catch (err) {
        console.log(err)
      }
    },
  })
  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          maxWidth: "500px",
        }}
        container
      >
        <TextField onChange={handleChange} name="otpInput" />
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

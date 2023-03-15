import React, { useState } from "react"

import {
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  Box,
  Button,
  TextField,
  Snackbar,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

import { useFormik } from "formik"
import { API } from "../../api"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import SnackbarAlert from "../../components/Sign/Otp/AlertSnackbar"
import { register } from "../../redux/features/authSlice"

export const useOtpFormik = () => {
  const selector = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const emailInput = selector.email
  // console.log(emailInput, "try2")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState("")

  const formik = useFormik({
    initialValues: {
      email: emailInput,
      otpInput: "",
    },
    onSubmit: async ({ otpInput, email }) => {
      try {
        const response = await API.post("/auth/verify", {
          otpInput,
          email: selector.email,
        })
        console.log(response, "tryy")
        setAlertMessage("Success!" + response.data.message)
        setAlertSeverity("success")
        // SnackbarAlert()
        dispatch(
          register({
            email: response.data.data.email,
          })
        )
        // console.log(response, "try3")
      } catch (err) {
        console.log(err)
        setAlertMessage("Error: " + err.response.data.message)
        setAlertSeverity("error")
      }
    },
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return { formik, handleChange, selector, alertMessage, alertSeverity }
}

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
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import SnackbarAlert from "../../components/Sign/Otp/AlertSnackbar"
import { register } from "../../redux/features/authSlice"

export const useOtpFormik = () => {
  const selector = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emailInput = selector.email
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState("")
  const [open, setOpen] = useState(false)

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
        setOpen(true)
        setAlertMessage("Success!" + response.data.message)
        setAlertSeverity("success")
        navigate("/")
        dispatch(
          register({
            email: response.data.data.email,
          })
        )
      } catch (err) {
        console.log(err)
        setAlertMessage("Error: " + err.response.data.message)
        setAlertSeverity("error")
        setOpen(true)
      }
    },
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return {
    formik,
    handleChange,
    selector,
    alertMessage,
    alertSeverity,
    open,
    setOpen,
  }
}

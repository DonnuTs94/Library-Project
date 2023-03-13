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
import { API } from "../../api"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { useSelector } from "react-redux"

export const useOtpFormik = () => {
  const selector = useSelector((state) => state.auth)
  const emailInput = selector.email
  console.log(emailInput, "try2")

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
        console.log(response, "try3")
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return { formik, handleChange, selector }
}

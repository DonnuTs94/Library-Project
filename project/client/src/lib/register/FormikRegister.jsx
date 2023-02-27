import { API } from "../../api"
import { useFormik } from "formik"
import * as Yup from "yup"
import React from "react"

export default function RegisterUser() {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      gender: "",
    },
    onSubmit: async ({ email, username, password, gender }) => {
      try {
        const response = await API.post("/auth/resgiter", {
          email,
          username,
          password,
          gender,
        })
        formik.setFieldValue({
          email: "",
          username: "",
          password: "",
          gender: "",
        })
      } catch (err) {
        return err.response
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email address").email(),
      username: Yup.string().required("Please enter your username"),
      password: Yup.string()
        .required("Please enter your new password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
  })
}

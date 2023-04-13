import { async } from "@firebase/util"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { API } from "../../api"
import { register } from "../../redux/features/authSlice"

export const useForgotPassword = () => {
  const [message, setMessage] = useState("")
  const [forgotPassword, setForgotPassword] = useState("")
  const [alertMessageForgot, setAlertMessageForgot] = useState("")
  const [alertSeverityForgot, setAlertSeverityForgot] = useState("")

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await API.post("/auth/forgot-passwordId", {
          email: values.email,
        })
        setForgotPassword(response.statusText)

        setAlertMessageForgot("Success!" + response.data.message)
        setAlertSeverityForgot("success")
      } catch (err) {
        console.log(err)
        setMessage(err)
        setAlertMessageForgot("Error:" + err.response.data.message)
        setAlertSeverityForgot("error")
      }
      console.log(forgotPassword, "coba2")
    },
  })
  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return {
    formik,
    handleChange,
    forgotPassword,
    alertMessageForgot,
    alertSeverityForgot,
    handleChange,
  }
}

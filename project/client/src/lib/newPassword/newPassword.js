import { useFormik } from "formik"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { API } from "../../api"

export const useNewPassword = () => {
  const [report, setReport] = useState("")
  const [alertMessageNew, setAlertMessageNew] = useState("")
  const [alertSeverityNew, setAlertSeverityNew] = useState("")

  const params = useParams()
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async ({ password }) => {
      try {
        const response = await API.post(`/auth/forgot-password/${params.id}`, {
          password,
        })
        setReport(response.data.message)
        setAlertMessageNew("Success!" + response.data.message)
        setAlertSeverityNew("success")
      } catch (err) {
        console.log(err)
        setAlertMessageNew("Error:" + err.response.data.message)
        setAlertSeverityNew("error")
      }
      console.log(report, "try new")
    },
  })
  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  return { formik, handleChange, report, alertMessageNew, alertSeverityNew }
}

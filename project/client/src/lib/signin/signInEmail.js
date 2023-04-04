import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { API } from "../../api"
import { signInWithGooglePopup } from "../../config/firebase"
import { login, logout } from "../../redux/features/authSlice"

export const useSignInWithEmail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector((state) => state.auth)
  const [alertMessage2, setAlertMessage2] = useState("")
  const [alertSeverity2, setAlertSeverity2] = useState("")
  const [authCheck, setAuthCheck] = useState(false)

  // Logout
  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout)
    navigate("/sign")
    window.location.reload()
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const response = await API.post("/auth/login", {
          email,
          password,
        })
        console.log(response, "try")
        localStorage.setItem("auth_token", response.data.token)
        navigate("/")
        setAlertMessage2("Success!" + response.data.message)
        setAlertSeverity2("success")
        dispatch(
          login({
            id: response.data.data.id,
            username: response.data.data.username,
            email: response.data.data.email,
          })
        )
      } catch (err) {
        console.log(err)
        setAlertMessage2("Error: " + err.response.data.message)
        setAlertSeverity2("error")
      }
    },
  })
  const handleChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  const keepUserLogIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }
      const response = await API.get("/auth/refresh-token", {
        headers: {
          authorization: `Bearer ${auth_token}`,
        },
      })
      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }

  return {
    formik,
    handleChange,
    alertMessage2,
    alertSeverity2,
    logoutBtnHandler,
    keepUserLogIn,
  }
}

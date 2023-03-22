import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signInWithGooglePopup } from "../../config/firebase"

export const SignInWithEmail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector((state) => state.auth)

  // Logout
  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout)
  }

  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup()
    const idToken = await result.user.getIdToken()
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
      } catch (err) {
        return err.response
      }
    },
  })
}

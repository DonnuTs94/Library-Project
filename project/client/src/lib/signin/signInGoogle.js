import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { API } from "../../api"
import { signInWithGooglePopup } from "../../config/firebase"
import { login } from "../../redux/features/authSlice"

export const useSihnInWithGoogle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup()
    const idToken = await result.user.getIdToken()

    const response = await API.post("/auth/login-google", {
      googleToken: idToken,
    })

    localStorage.setItem("auth_token", response.data.token)
    navigate("/")
    window.location.reload(false)
    dispatch(
      login({
        id: response.data.data.id,
        email: response.data.data.email,
        verified: true,
      })
    )
  }
  return {
    signInWithGoogle,
  }
}

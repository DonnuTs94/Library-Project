import { createSlice } from "@reduxjs/toolkit"

const storedEmail = localStorage.getItem("email")
const initialState = {
  id: 0,
  email: storedEmail || "",
  username: "",
  gender: "",
  password: "",
  profile_picture: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      localStorage.setItem("email", action.payload.email)
      state.username = action.payload.username
      state.gender = action.payload.gender
      state.password = action.payload.password
      state.verified = action.payload.verified
    },
    login: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.username = action.payload.username
      state.profile_picture = action.payload.profile_picture
      state.verified = action.payload.verified
    },
    logout: (state, action) => {
      state.id = 0
      state.email = ""
      state.username = ""
      state.profile_picture = ""
    },
  },
})

export const { register, login, logout } = authSlice.actions

export default authSlice.reducer

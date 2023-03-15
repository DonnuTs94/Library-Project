import { createSlice } from "@reduxjs/toolkit"

const storedEmail = localStorage.getItem("email")
const initialState = {
  id: 0,
  email: storedEmail || "",
  username: "",
  gender: "",
  password: "",
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
    },
  },
})

export const { register } = authSlice.actions

export default authSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  email: "",
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
      state.username = action.payload.username
      state.gender = action.payload.gender
      state.password = action.payload.password
    },
  },
})

export const { register } = authSlice.actions

export default authSlice.reducer

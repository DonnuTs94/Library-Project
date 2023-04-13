import { Box, Grid } from "@mui/material"
import React from "react"
import { useState } from "react"
import { createContext } from "react"
import VerifySuccess from "../../components/Sign/Otp/VerifyOtpFinish"
import OtpForm from "../../components/Sign/Otp/OtpForm"
import SignUp from "../../components/Sign/SignUp"
import OtpInput from "../../components/Sign/Otp/OtpInput"

const RegisterForm = () => {
  const UserContext = createContext()

  const [email, setEmail] = useState(null)
  const [verifying, setVerifying] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  return !verifying ? (
    <UserContext.Provider
      value={{
        email,
        username,
        password,
        gender,
        submit: (input) => {
          setEmail(input)
          setVerifying(true)
        },
      }}
    >
      {/* <Grid> */}
      {isRegistered ? (
        <VerifySuccess props={{ UserContext }} />
      ) : (
        <SignUp props={{ UserContext }} />
      )}
      {/* </Grid> */}
    </UserContext.Provider>
  ) : (
    <UserContext.Provider
      value={{
        email,
        username,
        password,
        gender,
        submit: () => {
          setIsRegistered(true)
          setVerifying(false)
        },
      }}
    >
      <OtpInput props={{ UserContext }} />
    </UserContext.Provider>
  )
}

export default RegisterForm

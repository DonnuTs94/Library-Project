// import { useContext } from "react"
// import { AuthContext } from "../../components/Sign/AuthProvider"
// import { TextField, Button } from "@mui/material"

// const VerifyOtp2 = () => {
//   const [otpInput, setOtpInput] = useState("")
//   const [email, setEmail] = useState("")

//   const { isLoading, verifyOtp } = useContext(AuthContext)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     verifyOtp(otpInput, email)
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="OTP"
//           value={otpInput}
//           onChange={(e) => setOtpInput(e.target.value)}
//         />
//         <TextField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Button type="submit" disabled={isLoading}>
//           Verify OTP
//         </Button>
//       </form>
//     </>
//   )
// }

// export default VerifyOtp2

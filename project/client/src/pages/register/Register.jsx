// import { useContext, useState } from "react"
// import { AuthContext } from "../../components/Sign/AuthProvider"
// import { Button, TextField } from "@mui/material"

// const Register = () => {
//   const [email, setEmail] = useState("")
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [gender, setGender] = useState("")

//   const { isLoading, registerUser } = useContext(AuthContext)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const userData = {
//       email,
//       username,
//       password,
//       gender,
//     }
//     registerUser(userData)
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           label="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <TextField
//           label="gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//         />

//         <Button type="submit" disabled={isLoading}>
//           Register
//         </Button>
//       </form>
//     </>
//   )
// }

// export default Register

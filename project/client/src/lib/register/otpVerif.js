// import { useFormik } from "formik"
// import { API } from "../../api"

// export const otpVerif = (id) => {
//   const formik = useFormik({
//     initialValues: {
//       otpInput: "",
//     },
//     onSubmit: async ({ otpInput }) => {
//       try {
//         const response = await API.post(`/auth/verify/${id}`, {
//           otpInput,
//         })
//         formik.setFieldValue("otpInput", "")
//       } catch (err) {
//         return err.response
//       }
//     },
//   })
//   const handleChange = ({ target }) => {
//     const { name, value } = target
//     formik.setFieldValue(name, value)
//   }

//   return { formik, handleChange }
// }

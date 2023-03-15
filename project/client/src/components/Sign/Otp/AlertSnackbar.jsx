const { Snackbar, Alert } = require("@mui/material")
const { useState } = require("react")
// import React from "react"

const SnackbarAlert = () => {
  const [open, setOpen] = useState(false)
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity="success">
        Form submitted successfully!
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert

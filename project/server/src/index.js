const express = require("express")
const cors = require("cors")

const PORT = 8000
const app = express()

// app.use(cors())
app.use(express.json())

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    console.log(`APP RUNNING at ${PORT}`)
  }
})

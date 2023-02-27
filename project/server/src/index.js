const express = require("express")
const cors = require("cors")

const db = require("../models")

const admindBooks = require("../routes/admin-books.Route")
const authRoute = require("../routes/auth.route")

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/admin-books", admindBooks)
app.use("/auth", authRoute)

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    db.sequelize.sync({ alter: true })
    console.log(`APP RUNNING at ${PORT}`)
  }
})

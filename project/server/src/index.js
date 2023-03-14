const express = require("express")
const cors = require("cors")
const db = require("../models")

const categoriesRoute = require("../routes/admin/category.Routes")
const admindBooks = require("../routes/admin-books.Route")
const authRoute = require("../routes/auth.route")

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())
// app.use("/api", express.static(path.join(__dirname, ".././public")))

app.use("/categories", categoriesRoute)
app.use("/api/admin-books", admindBooks)
app.use("/auth", authRoute)

app.listen(PORT, (err) => {
  db.sequelize.sync({ alter: true })
  if (err) {
    console.log(`Error : ${err.message}`)
  } else {
    console.log(`Listening to PORT ${PORT}`)
  }
})

const express = require("express")
const cors = require("cors")
const db = require("../models")

const categoriesRoute = require("../routes/admin/category.Routes")

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())

app.use("/categories", categoriesRoute)

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    db.sequelize.sync({ alter: true })
    console.log(`APP RUNNING at ${PORT}`)
  }
})

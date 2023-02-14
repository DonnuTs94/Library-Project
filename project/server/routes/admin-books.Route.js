const express = require("express")
const adminBookController = require("../controller/admin-books.Controller")

const router = express.Router()

router.get("/", adminBookController.getAllAdminBooks)

module.exports = router

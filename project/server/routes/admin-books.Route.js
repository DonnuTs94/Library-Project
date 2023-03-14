const express = require("express")
const adminBookController = require("../controller/admin-books.Controller")
const { upload } = require("../lib/uploader")

const router = express.Router()

router.get("/", adminBookController.getAllAdminBooks)
// CREATE Book
router.post("/create", upload({}), adminBookController.createBooks)
// Delete Book
router.delete("/delete/:id", adminBookController.deleteBooks)

module.exports = router

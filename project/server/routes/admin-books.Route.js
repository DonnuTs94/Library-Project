const express = require("express")
const adminBookController = require("../controller/admin-books.Controller")
const { upload } = require("../lib/uploader")
const { body, param } = require("express-validator")

const router = express.Router()

router.get("/", adminBookController.getAllAdminBooks)
// CREATE Book
router.post("/create", upload({}), adminBookController.createBooks)
// DELETE Books
router.delete("/delete/:id", adminBookController.deleteBooks)
// UPDATE Books
// router.patch("/update/:id", upload({}), adminBookController.updateBooks)
router.patch("/update/:id", adminBookController.updateBooks)
// GET Books ID
router.get("/books/:id", adminBookController.getBookById)

module.exports = router

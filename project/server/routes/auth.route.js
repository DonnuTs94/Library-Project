const express = require("express")

const authController = require("../controller/auth.Controller")

const router = express.Router()

router.post("/register", authController.registerUser)

module.exports = router

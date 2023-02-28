const express = require("express")

const authController = require("../controller/auth.Controller")

const router = express.Router()

router.post("/register", authController.registerUser)
router.post("/verify/:id", authController.verifyOtp)

module.exports = router

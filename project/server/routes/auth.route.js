const express = require("express")

const authController = require("../controller/auth.Controller")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/register", authController.registerUser)
router.post("/verify", authController.verifyOtp)
router.post("/new-verify", authController.requestOTP)

module.exports = router

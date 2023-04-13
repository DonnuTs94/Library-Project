const express = require("express")

const authController = require("../controller/auth.Controller")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/register", authController.registerUser)
router.post("/verify", authController.verifyOtp)
router.post("/new-verify", authController.requestOTP)
router.post("/login", authController.loginUserWithEmail)
router.get("/refresh-token", verifyToken, authController.refreshToken)
router.post("/login-google", authController.loginWithGoogle)
router.post("/forgot-passwordId", authController.sentForgetPassword)
router.post("/forgot-password/:id", authController.changePassword)

module.exports = router

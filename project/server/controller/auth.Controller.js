const { Op, where } = require("sequelize")
const fs = require("fs")
const db = require("../models")
const handlebars = require("handlebars")
const User = db.User
const bcrypt = require("bcrypt")
const emailer = require("../lib/emailer")
const otpGenerator = require("otp-generator")
const { object } = require("yup")
const { triggerAsyncId } = require("async_hooks")
const { sequelize } = require("../models")
const { signToken } = require("../lib/jwt")
const { verifyGoogleToken } = require("../lib/firebase")
const { async } = require("@firebase/util")

const authController = {
  registerUser: async (req, res) => {
    try {
      const { email, username, password, gender } = req.body

      function generateRandomNumber() {
        var minm = 10000
        var maxm = 99999
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm
      }
      const otp = generateRandomNumber()

      function AddMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60 * 1000)
      }
      const now = new Date()
      const expiration_time = AddMinutesToDate(now, 10)

      const findUserByEmail = await User.findOne({
        where: { email },
      })

      if (findUserByEmail && findUserByEmail.password === null) {
        return res.status(400).json({
          message: "Use your email to sign with google",
        })
      }
      if (findUserByEmail) {
        return res.status(400).json({
          message: "Your email has been used",
        })
      }
      const hashedPassword = bcrypt.hashSync(password, 5)

      const createUser = await User.create({
        email,
        username,
        password: hashedPassword,
        gender,
        otp: otp,
        expiration_time: expiration_time,
        verified: false,
      })
      // SENDING EMAIL
      const rawHTML = fs.readFileSync("templates/register_user.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHTML)
      const htmlResult = compiledHTML({
        username,
        otp,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Verify your account",
        text: "Please verify your account",
      })

      return res.status(200).json({
        message: "User registered",
        data: createUser,
      })
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: "Server error",
      })
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const currentDate = new Date()
      const { otpInput, email } = req.body
      // const timeLimitInMs = 5 * 60 * 1000
      // const latestVerificationTime = new Date(Date.now() - timeLimitInMs)

      const otpExist = await User.findOne({
        where: {
          email,
        },
        attributes: ["id", "otp", "verified", "expiration_time", "username"],
      })
      if (!otpExist || otpInput !== otpExist.otp) {
        return res.status(401).json({
          message: "Kode yang kamu masukkan salah.",
        })
      }
      if (currentDate > otpExist.expiration_time) {
        return res.status(401).json({
          message: "Kode yang kamu masukkan sudah tidak berlaku.",
        })
      }
      if (otpExist.verified) {
        return res.status(200).json({
          message: "user sudah diverifikasi",
        })
      }
      await db.User.update(
        { verified: true, otp: null, expiration_time: null },
        {
          where: {
            email,
          },
          attributes: ["username"],
        }
      )
      //SENDING EMAIL
      const username = otpExist.username
      const rawHTML = fs.readFileSync("templates/verify_success.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHTML)
      const htmlResult = compiledHTML({
        username,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Activation successful!",
        text: "Your account has been activated!",
      })

      return res.status(200).json({
        message: "User verified",
      })
    } catch (err) {
      console.log(err)
    }
  },
  requestOTP: async (req, res) => {
    try {
      const { email } = req.body
      const user = await User.findOne({
        where: {
          email,
          verified: false,
        },
        attributes: ["id", "username"],
      })
      const { username } = user
      // New OTP
      function generateRandomNumber() {
        var minm = 10000
        var maxm = 99999
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm
      }
      const otp = generateRandomNumber()
      // New Expiration time
      function AddMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60 * 1000)
      }
      const now = new Date()
      const expired_time = AddMinutesToDate(now, 10)
      await User.update(
        { otp: otp, expiration_time: expired_time },
        {
          where: {
            email,
          },
        }
      )

      // SENDING EMAIL
      const rawHTML = fs.readFileSync("templates/register_user.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHTML)
      const htmlResult = compiledHTML({
        otp,
        email,
        username: username,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Verify your account",
        text: "Please verify your account",
      })

      return res.status(200).json({
        message: "NEW OTP has been sent",
      })
    } catch (err) {
      console.log(err)
    }
  },
  loginUserWithEmail: async (req, res) => {
    try {
      const { email, password } = req.body

      const findUserByEmail = await User.findOne({
        where: { email },
        attributes: ["verified", "id", "password", "username"],
      })
      if (!findUserByEmail) {
        return res.status(400).json({
          message: "User not found",
        })
      }
      if (!findUserByEmail.verified) {
        return res.status(200).json({
          message: "Please activated your account first",
        })
      }
      const passwordValid = bcrypt.compareSync(
        password,
        findUserByEmail.password
      )
      if (!passwordValid) {
        return res.status(400).json({
          message: "Your password incorrect. Re-type your password",
        })
      }
      delete findUserByEmail.dataValues.password
      const token = signToken({
        id: findUserByEmail.id,
      })

      return res.status(201).json({
        message: "Login successful",
        data: findUserByEmail,
        token,
      })
    } catch (err) {
      console.log(err)
    }
  },
  refreshToken: async (req, res) => {
    try {
      const findUserById = await User.findByPk(req.user.id)

      const renewToken = signToken({
        id: req.user.id,
      })
      return res.status(200).json({
        message: "renew user token",
        data: findUserById,
        token: renewToken,
      })
    } catch (err) {
      console.log(err)
    }
  },
  loginWithGoogle: async (req, res) => {
    try {
      const { googleToken } = req.body
      const { email } = await verifyGoogleToken(googleToken)

      const [user] = await User.findOrCreate({
        where: { email },
        defaults: {
          verified: true,
          username: "New user",
        },
      })

      const token = signToken({
        id: user.id,
      })
      console.log(token, "Conbap")
      return res.status(200).json({
        message: "User logged In",
        data: user,
        token,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Error logging in with Google",
      })
    }
  },
  sentForgetPassword: async (req, res) => {
    try {
      const { email } = req.body
      const emailExist = await User.findOne({
        where: { email },
        attributes: ["id", "username"],
      })

      if (!emailExist) {
        return res.status(401).json({
          message: "User not found",
        })
      }
      if (emailExist.password == null && emailExist.verified == true) {
        return res.status(200).json({
          message: "Please use sign in with google with this email account",
        })
      }
      const token = signToken({ id: emailExist.id })
      function generateRandomNumber() {
        var minm = 10000
        var maxm = 99999
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm
      }
      const randomIdForgotPassword = generateRandomNumber()
      function AddMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60 * 1000)
      }
      const now = new Date()
      const expiration_link = AddMinutesToDate(now, 1440)

      const createForgotPasswordId = await db.Forget_Password.create({
        id_forget: randomIdForgotPassword,
        UserId: emailExist.id,
        expiration_link,
      })
      const resetLink = `http://localhost:3000/${createForgotPasswordId}`

      // SENDING EMAIL
      const username = emailExist.username
      const rawHTML = fs.readFileSync("templates/forgot_password.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHTML)
      const htmlResult = compiledHTML({
        randomIdForgotPassword,
        resetLink,
        username,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Reset password",
        text: "Please reset your password",
      })
      return res.status(201).json({
        message: "Forgot password ID has been created",
        data: createForgotPasswordId,
        token: token,
      })
    } catch (err) {
      console.log(err)
    }
  },
  changePassword: async (req, res) => {
    const currentDate = new Date()
    try {
      const findForgotPasswordId = await db.Forget_Password.findOne(
        {
          where: {
            id_forget: req.params.id,
          },
        },
        { include: [User] }
      )
      const user = await User.findOne({
        where: { id: findForgotPasswordId.UserId },
      })
      if (!user) {
        return res.status(400).json({ message: "User not found" })
      }

      const email = user.email
      const username = user.username
      // console.log(email, "try")
      if (currentDate > findForgotPasswordId.expiration_link) {
        return res.status(400).json({
          message: "Your link expired, please ask back for new link",
        })
      }

      if (findForgotPasswordId.forgot_success === true) {
        return res.status(400).json({
          message: "Your link not applicable ",
        })
      }
      const { password } = req.body

      const hashedPassword = bcrypt.hashSync(password, 5)
      await User.update(
        { password: hashedPassword },
        {
          where: {
            id: findForgotPasswordId.UserId,
          },
        }
      )
      const updatePassword = await db.Forget_Password.update(
        { forgot_success: true },
        {
          where: {
            id_forget: req.params.id,
          },
        }
      )
      // SENDING EMAIL
      const rawHTML = fs.readFileSync(
        "templates/success_reset_password.html",
        "utf-8"
      )
      const compiledHTML = handlebars.compile(rawHTML)
      const htmlResult = compiledHTML({
        username,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Reset password success",
        text: "Your password has been reset",
      })

      return res.status(200).json({
        message: "password updated",
        data: updatePassword,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Error to change your password",
      })
    }
  },
}

module.exports = authController

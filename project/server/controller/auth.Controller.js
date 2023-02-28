const { Op } = require("sequelize")
const fs = require("fs")
const db = require("../models")
const handlebars = require("handlebars")
const User = db.User
const bcrypt = require("bcrypt")
const emailer = require("../lib/emailer")

const authController = {
  registerUser: async (req, res) => {
    try {
      const { email, username, password, gender } = req.body

      const findUserByEmail = await User.findOne({
        where: { email },
      })

      if (findUserByEmail) {
        return res.status(400).json({
          message: "Your email has been used",
        })
      }
      const hashedPassword = bcrypt.hashSync(password, 5)

      await User.create({
        email,
        username,
        password: hashedPassword,
        gender,
      })
      const rawHTML = fs.readFileSync("templates/register_user.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHTML)
      const htmlResult = compiledHTML({
        username,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Verify your account",
        text: "Please verify your account",
      })

      return res.status(200).json({
        message: "User registered",
      })
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = authController

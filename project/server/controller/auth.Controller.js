const { Op } = require("sequelize")

const db = require("../models")

const User = db.User
const bcrypt = require("bcrypt")

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

      await User.create({
        email,
        username,
        password,
        gender,
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

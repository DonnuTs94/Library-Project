const db = require("../models")
const findAllAdminBooks = db.Books

module.exports = {
  getAllAdminBooks: async (req, res) => {
    try {
      const foundAllAdminBooks = await findAllAdminBooks.findAll({
        include: [
          {
            model: db.Categories,
          },
          {
            model: db.Book_Picture,
          },
        ],
      })

      return res.status(200).json({
        data: foundAllAdminBooks,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  createBooks: async (req, res) => {},
  updateBooks: async (req, res) => {},
  deleteBooks: async (req, res) => {},
}

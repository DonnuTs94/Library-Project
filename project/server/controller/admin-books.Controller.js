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
        // where: { CategoryId: req.query.CategoryId },
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
  getAllCategory: async (req, res) => {
    try {
      const foundAllCategories = await db.Categories.findAll()

      return res.status(200).json({
        data: foundAllCategories,
      })
    } catch (error) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

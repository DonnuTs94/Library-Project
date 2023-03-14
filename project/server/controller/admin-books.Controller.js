const db = require("../models")
const findAllAdminBooks = db.Books
const { Book_Pictures, Books, Book_Stocks, Categories } = require("../models")
const fs = require("fs")
const path = require("path")
// const image = require("../public")

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
  createBooks: async (req, res) => {
    try {
      // Input validation
      const { title, author, description, categoryId } = req.body
      if (!title || !author || !description || !categoryId) {
        return res
          .status(400)
          .json({ message: "Invalid request: missing fields" })
      }

      // Check if category exists
      const category = await Categories.findByPk(categoryId)
      if (!category) {
        return res.status(400).json({ message: "Invalid category ID" })
      }

      // Check if book already exists
      const existingBook = await Books.findOne({
        where: { title, author },
      })
      if (existingBook) {
        return res.status(400).json({ message: "Book already exists" })
      }

      // Create new book
      const newBook = await Books.create({
        title,
        author,
        description,
        CategoryId: categoryId,
      })

      // Create book pictures
      const bookPictures = req.files
      const pictureData = bookPictures.map((picture) => ({
        picture: picture.path,
        BookId: newBook.id,
      }))
      await Book_Pictures.bulkCreate(pictureData)

      // Create book stocks
      await Book_Stocks.create({
        stock: 0,
        BookId: newBook.id,
      })

      res.status(201).json({ message: "Book created successfully" })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        message: "Failed to create book: internal server error",
      })
    }
  },
  updateBooks: async (req, res) => {},
  deleteBooks: async (req, res) => {
    try {
      const { id } = req.params

      const deletedBook = await Books.destroy({ where: { id } })

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" })
      }

      const bookPictures = await Book_Pictures.findAll({
        where: { BookId: id },
      })

      if (bookPictures.length > 0) {
        const pictureIds = bookPictures.map((picture) => picture.id)

        await Book_Pictures.destroy({ where: { id: pictureIds } })

        bookPictures.forEach((picture) => {
          const picturePath = path.resolve(__dirname, "..", picture.picture)
          fs.unlinkSync(picturePath)
        })
      }

      // Delete book stocks
      await Book_Stocks.destroy({ where: { BookId: id } })

      return res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error" })
    }
  },
}

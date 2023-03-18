const db = require("../models")
const findAllAdminBooks = db.Books
const {
  Book_Pictures,
  Books,
  Book_Stocks,
  Categories,
  Stocks,
} = require("../models")
const fs = require("fs")
const path = require("path")
const { validationResult, body } = require("express-validator")

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
      const { title, author, description, categoryId, stock } = req.body
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
        stock,
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
  updateBooks: async (req, res) => {
    try {
      const { id } = req.params
      const { author, title, description, stock, CategoryId } = req.body

      // Ensure the book's category exists
      const category = await Categories.findOne({ where: { id: CategoryId } })
      if (!category) {
        return res.status(400).json({ message: "Category not found" })
      }

      // Update book data
      const book = await Books.findOne({ where: { id } })
      if (!book) {
        return res.status(404).json({ message: "Book not found" })
      }

      book.author = author
      book.title = title
      book.description = description
      book.CategoryId = CategoryId
      await book.save()

      // Update book stock
      const bookStock = await Book_Stocks.findOne({ where: { BookId: id } })
      if (!bookStock) {
        return res.status(404).json({ message: "Book Stock not found" })
      }

      bookStock.stock = stock
      await bookStock.save()

      return res.json({ message: "Book updated successfully" })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: `Failed to update book : ${err}` })
    }
  },
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
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Internal server error : " })
    }
  },
  getBookById: async (req, res) => {
    const { id } = req.params
    try {
      const book = await Books.findByPk(id, {
        include: [Categories, Book_Pictures],
      })
      if (book) {
        return res.status(200).json(book)
      } else {
        return res.status(400).send("Book not found")
      }
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: `Internal Server Error : ${err}` })
    }
  },
}

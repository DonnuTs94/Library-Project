const { Categories } = require("../../models")
const { Op } = require("sequelize")

// this doesn't necessary as we using TablePagination
const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 3

const categoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || DEFAULT_PAGE
      const limit = parseInt(req.query.limit) || DEFAULT_LIMIT
      const offset = (page - 1) * limit

      const categories = await Categories.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
      })

      const pageCount = Math.ceil(categories.count / limit)

      return res.status(200).json({
        data: categories.rows,
        page,
        pageCount,
        total: categories.count,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: `Server Error : ${err.message} ` })
    }
  },
  getCategoryById: async (req, res) => {
    const id = req.params.id
    try {
      const category = await Categories.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      })
      if (category) {
        return res.status(200).json(category)
      } else {
        return res.status(400).send("Category not found")
      }
    } catch (err) {
      console.error(err)
      return res.status(500).send("An error occured while retrieving category")
    }
  },
  createCategories: async (req, res) => {
    try {
      const { category_name } = req.body

      const categoryExist = await Categories.findOne({
        where: { category_name },
      })

      if (categoryExist) {
        return res
          .status(400)
          .json({ message: "A category with this name already exist" })
      }

      const newCategory = await Categories.create({ category_name })

      return res
        .status(201)
        .json({ message: "Category created successfully", data: newCategory })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        message: `Internal Server Error : ${err.message}`,
      })
    }
  },
  updateCategories: async (req, res) => {
    const id = req.params.id
    const { category_name } = req.body

    try {
      const category = await Categories.findByPk(id)

      if (!category) {
        return res.status(401).json({ message: "Category not found" })
      }

      category.category_name = category_name || category.category_name

      await category.save()
      return res.status(200).json({ message: "Category updated", category })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Error updating category" })
    }
  },
  deleteCategories: async (req, res) => {
    try {
      const { id } = req.params

      const category = await Categories.findByPk(id)
      if (!category) {
        return res.status(404).json({ message: "Category not found" })
      }

      await category.destroy()
      res.json({ message: "Category deleted successfully" })
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: `Internal Server Error : ${err.message}` })
    }
  },
}

module.exports = categoriesController

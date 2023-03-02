const express = require("express")
const categoriesController = require("../../controllers/admin/categoriesController")
const router = express.Router()

// GET All Categories Data
router.get("/", categoriesController.getAllCategories)
// GET Category By ID
router.get("/:id", categoriesController.getCategoryById)
// CREATE Categories
router.post("/create", categoriesController.createCategories)
// UPDATE Categories
router.patch("/:id", categoriesController.updateCategories)
// DELETE Categories Data
router.delete("/delete/:id", categoriesController.deleteCategories)

module.exports = router

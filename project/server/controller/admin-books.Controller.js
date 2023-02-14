const db = require("../models")
const findAllAdminBooks = db.Books

module.exports = {
  getAllAdminBooks: async (req, res) => {
    try {
      // menggunakan parseInt karena limit & omset hanya menerima parameter integer
      let limit = parseInt(req.query.record) || 3
      let page = parseInt(req.query.page) || 1

      let start = 0 + (page - 1) * limit
      let end = page * limit

      const adminBooks = await findAllAdminBooks.findAndCountAll({
        include: [{ model: db.Book_Picture }],
        limit: limit,
        offset: start,

        // limit: 5,
        // offset: 0,
      })

      let countFiltered = adminBooks.count
      let pagination = {}
      pagination.totalRow = adminBooks.count
      pagination.totalPage = Math.ceil(countFiltered / limit)
      // Math.ceil digunakan ketika ada pembagian untuk pembulatan ke atas

      // next akan muncul ketika ada data di page selanjutnya
      if (end < countFiltered) {
        pagination.next = {
          page: page + 1,
          limit,
        }
      }

      if (start > 0) {
        pagination.prev = {
          page: page - 1,
          limit,
        }
      }

      return res.status(200).json({
        message: "Found All Books",
        data: adminBooks.rows,
        pagination,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

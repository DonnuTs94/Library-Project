const multer = require("multer")

const upload = ({
  filePrefix = "FILE",
  acceptedFileTypes = ["jpg", "jpeg", "png"],
  fileSizeLimit = 3 * 1024 * 1024, // 3 MB
  maxFiles = 3,
}) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "")
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1]
      cb(null, `${filePrefix}-${file.originalname}`)
    },
  })

  const fileFilter = (req, file, cb) => {
    const extension = file.mimetype.split("/")[1]
    if (acceptedFileTypes.includes(extension)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type"))
    }
  }

  const limits = { fileSize: fileSizeLimit, files: maxFiles }

  const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(400).send("File upload error: File size is too large")
      } else {
        res.status(400).send("File upload error: " + err.message)
      }
    } else {
      res.status(500).send("Unexpected error during file upload")
    }
  }
  return multer({
    storage: diskStorage,
    fileFilter,
    limits,
    onError: errorHandler,
  }).any()
}

module.exports = { upload }

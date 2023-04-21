
const multer = require('multer')
const ApiError = require('../utils/apiError')

exports.uploadSingleImage = (fieldName) => {
    // MemoryStorage engine   buffer
    const storage = multer.memoryStorage()

    // validator if user upload image
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new ApiError('only image allow', 400), false)
        }
    }
    const upload = multer({ storage: storage, fileFilter: multerFilter })

    return upload.single(fieldName)
}

exports.uploadMultImage = (fieldName) => {
    // MemoryStorage engine   buffer
    const storage = multer.memoryStorage()

    // validator if user upload image
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new ApiError('only image allow', 400), false)
        }
    }
    const upload = multer({ storage: storage, fileFilter: multerFilter })

    return upload.fields(fieldName)
}
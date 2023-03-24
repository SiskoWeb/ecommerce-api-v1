const express = require('express')

const router = express.Router()

const { createProduct, getAllProduct, getProductById, deleteProduct, updateProduct } = require('../services/productService')
const { getProductValidator, createProductalidator, updatetProductalidator, deletetProductalidator } = require('../utils/validators/productValidator')

router.route('/').post(createProductalidator, createProduct).get(getAllProduct)
router.route('/:id').get(getProductValidator, getProductById).put(updatetProductalidator, updateProduct).delete(deletetProductalidator, deleteProduct)

module.exports = router
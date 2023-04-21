const express = require('express')

const router = express.Router()

const { imageUploaderBrand, resizeImage, createProduct, getAllProduct, getProductById, deleteProduct, updateProduct } = require('../services/productService')
const { getProductValidator, createProductalidator, updatetProductalidator, deletetProductalidator } = require('../utils/validators/productValidator')
const AuthService = require('../services/authService')

router.route('/').post(AuthService.protect, AuthService.allowedTo('admin', "manager"),imageUploaderBrand, resizeImage, createProductalidator, createProduct).get(getAllProduct)
router.route('/:id').get(getProductValidator, getProductById).put(AuthService.protect, AuthService.allowedTo('admin', "manager"),imageUploaderBrand, resizeImage, updatetProductalidator, updateProduct)
.delete(AuthService.protect, AuthService.allowedTo('admin', "manager"),deletetProductalidator, deleteProduct)

module.exports = router
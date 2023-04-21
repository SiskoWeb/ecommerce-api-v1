const express = require('express')

const AuthService = require('../services/authService')


const { addBrand, getBrand, getBrandById, updateBrand, deleteBrand, imageUploaderBrand, resizeImage } = require('../services/brandService')
const { getBrandValidator, createBrandalidator, updatetBrandalidator, deletetBrandalidator } = require('../utils/validators/brandValidator')

const router = express.Router()

router.route('/')
    .post(AuthService.protect, AuthService.allowedTo('admin', "manager"),imageUploaderBrand, resizeImage, createBrandalidator, addBrand)
    .get(getBrand)


router.route('/:id')
    .put(AuthService.protect, AuthService.allowedTo('admin', "manager"),imageUploaderBrand, resizeImage,updatetBrandalidator, updateBrand)
    .delete(AuthService.protect, AuthService.allowedTo('admin', "manager"),deletetBrandalidator, deleteBrand)
    .get(getBrandValidator, getBrandById)

module.exports = router
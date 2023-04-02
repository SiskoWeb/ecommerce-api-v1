const express = require('express')




const { addBrand, getBrand, getBrandById, updateBrand, deleteBrand, imageUploaderBrand, resizeImage } = require('../services/brandService')
const { getBrandValidator, createBrandalidator, updatetBrandalidator, deletetBrandalidator } = require('../utils/validators/brandValidator')

const router = express.Router()

router.route('/')
    .post(imageUploaderBrand, resizeImage, createBrandalidator, addBrand)
    .get(getBrand)


router.route('/:id')
    .put(imageUploaderBrand, resizeImage,updatetBrandalidator, updateBrand)
    .delete(deletetBrandalidator, deleteBrand)
    .get(getBrandValidator, getBrandById)

module.exports = router
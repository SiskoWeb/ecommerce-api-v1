const express = require('express')
const { addBrand, getBrand, getBrandById, updateBrand, deleteBrand } = require('../services/brandService')
const { getBrandValidator, createBrandalidator, updatetBrandalidator, deletetBrandalidator } = require('../utils/validators/brandValidator')

const router = express.Router()

router.route('/').post(createBrandalidator, addBrand).get(getBrand)
router.route('/:id').put(updatetBrandalidator, updateBrand).delete(deletetBrandalidator, deleteBrand).get(getBrandValidator, getBrandById)

module.exports = router
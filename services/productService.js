const slugify = require('slugify')
const asyncHandler = require('express-async-handler')

const productModel = require('../models/productModel')
const ApiError = require('../utils/apiError')


exports.createProduct = asyncHandler(async (req, res) => {

    req.body.slug = slugify(req.body.title)
    const nwProduct = await productModel.create(req.body)
    nwProduct.save()
    res.status(201).json({ data: nwProduct })
})



exports.getAllProduct = asyncHandler(async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit

    const products = await productModel.find({}).skip(skip).limit(limit)
    res.status(201).json({ resualts: products.length, page, data: products })
})


exports.getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const product = await productModel.findById(id)

    if (!product) {
        return next(new ApiError(`the is no subCategory with this id : ${id}`))
    }
    res.status(201).json({ data: product })


})

exports.updateProduct = asyncHandler(async (req, res, next) => {

    const { id } = req.params

    req.body.slug = slugify(req.body.title)

    const product = await productModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })

    if (!product) {
        return next(new ApiError(`the is no subCategory with this id : ${id}`))
    }
    res.status(201).json({ data: product })


})


exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const product = await productModel.findByIdAndDelete(id)

    if (!product) {
        return next(new ApiError(`the is no subCategory with this id : ${id}`))
    }
    res.status(201).json({ data: product })


})
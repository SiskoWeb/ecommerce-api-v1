const asyncHandler = require('express-async-handler')

const slugify = require('slugify')
const brandModel = require('../models/brandModel')
const ApiError = require('../utils/apiError')

exports.addBrand = asyncHandler(async (req, res) => {

    const { name } = req.body

    const newBrand = await brandModel.create({ name: name, slug: slugify(name) })
    res.status(201).json({ data: newBrand })

})




exports.getBrand = asyncHandler(async (req, res) => {

    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit
    const brands = await brandModel.find({}).skip(skip).limit(limit)
    res.status(201).json({ results: brands.length, page, data: brands })


})


exports.getBrandById = asyncHandler(async (req, res, next) => {

    const { id } = req.params

    const brand = await brandModel.findById(id)

    if (!brand) {
        return next(new ApiError(`no category for this id : ${id}`, 404))
    }
    res.status(201).json({ data: brand })
})

exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    const brand = await brandModel.findByIdAndUpdate({ _id: id }, { name: name, slug: slugify(name) }, { new: true })

    if (!brand) {
        return next(new ApiError(`no category for this id : ${id}`, 404))
    }
    res.status(201).json({ data: brand })
})

exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const brand = await brandModel.findByIdAndDelete(id)

    if (!brand) {
        return next(new ApiError(`no category for this id : ${id}`, 404))
    }
    res.status(201).json({ data: brand })
})
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')

const productModel = require('../models/productModel')
const ApiError = require('../utils/apiError')


exports.createProduct = asyncHandler(async (req, res) => {

    req.body.slug = slugify(req.body.title)

    const newProduct = await productModel.create(req.body)
    newProduct.save()
    res.status(201).json({ data: newProduct })
})



exports.getAllProduct = asyncHandler(async (req, res) => {

    //filtring
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryStringObj = { ...req.query }
    const excludesFields = ['page', 'sort', ' limit', 'fields']
    excludesFields.forEach((field) => delete queryStringObj[field])

    // apply filteration using [gte , gt , lte , lt]
    let queryStr = JSON.stringify(queryStringObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)


    // pagination
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit

    //build query

    let mongooseQuery = productModel.find(JSON.parse(queryStr))
        .skip(skip)
        .limit(limit)
        .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle


    //sorting (exmp: ?sort=price,sold)
    if (req.query.sort) {


        const sortBy = req.query.sort.split(",").join(' ')


        mongooseQuery = mongooseQuery.sort(sortBy)
    }

    //field limiting ( call only spicific field)     (exmp: ?fields=price,sold)
    if (req.query.fields) {
        console.log(req.query.fields)

        const fileds = req.query.fields.split(",").join(' ')
        mongooseQuery = mongooseQuery.select(fileds)

    }
    else {
        mongooseQuery = mongooseQuery.select("-__v")
    }


    //search 
    if(req.query.search){

        // const { keyword } = req.query.keyword

        const query = {}
        query.$or = [
            { title: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } }

        ];

        // mongooseQuery = mongooseQuery.find({ title: req.query.search })
        mongooseQuery = productModel.find(query)
            .skip(skip)
            .limit(limit)
            .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle
    }



    const products = await mongooseQuery

    res.status(201).json({ resualts: products.length, page, data: products })
})


exports.getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const product = await productModel.findById(id)
        .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle


    if (!product) {
        return next(new ApiError(`the is no subCategory with this id : ${id}`))
    }
    res.status(201).json({ data: product })


})

exports.updateProduct = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }


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
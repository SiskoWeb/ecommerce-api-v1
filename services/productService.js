const slugify = require('slugify')
const asyncHandler = require('express-async-handler')

const ProductModel = require('../models/productModel')

const ApiError = require('../utils/apiError')

const ApiFeatures = require("../utils/apiFeatures")



const factory = require('./handlersFactory')




// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getAllProduct = factory.getAll(ProductModel, 'Products');

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getProductById = factory.getOne(ProductModel);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createProduct = factory.createOne(ProductModel);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateProduct = factory.updateOne(ProductModel);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(ProductModel);



















// exports.createProduct = asyncHandler(async (req, res) => {

//     req.body.slug = slugify(req.body.title)

//     const newProduct = await ProductModel.create(req.body)
//     newProduct.save()
//     res.status(201).json({ data: newProduct })
// })



// exports.getAllProduct = asyncHandler(async (req, res) => {




//     //build query
//     const Documentscount = ProductModel.countDocuments()

//     const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
//         .paginate(Documentscount)
//         .filter().
//         sort()
//         .limitFields()
//         .search('Products')

//     const { mongooseQuery, paginationResult } = apiFeatures

//     const products = await mongooseQuery;


//     res.status(201).json({ resualts: products.length, paginationResult, data: products })


//         .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle


// })



// exports.getProductById = asyncHandler(async (req, res, next) => {
//     const { id } = req.params

//     const product = await ProductModel.findById(id)
//         .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle


//     if (!product) {
//         return next(new ApiError(`the is no subCategory with this id : ${id}`))
//     }
//     res.status(201).json({ data: product })


// })

// exports.updateProduct = asyncHandler(async (req, res, next) => {

//     const { id } = req.params
//     if (req.body.title) {
//         req.body.slug = slugify(req.body.title)
//     }


//     const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })

//     if (!product) {
//         return next(new ApiError(`the is no subCategory with this id : ${id}`))
//     }
//     res.status(201).json({ data: product })


// })


// exports.deleteProduct = asyncHandler(async (req, res, next) => {
//     const { id } = req.params

//     const product = await ProductModel.findByIdAndDelete(id)

//     if (!product) {
//         return next(new ApiError(`the is no subCategory with this id : ${id}`))
//     }
//     res.status(201).json({ data: product })


// })
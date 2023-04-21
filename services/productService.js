const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const sharp = require('sharp');

const multer = require('multer')
const ProductModel = require('../models/productModel')

const ApiError = require('../utils/apiError')

const ApiFeatures = require("../utils/apiFeatures")

const { uploadMultImage } = require('../middleware/uploadImageMiddleWar')


const factory = require('./handlersFactory')

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







exports.resizeImage = asyncHandler(async (req, res, next) => {

    console.log(req.files)
    if (req.files.imageCover) {

        const coverfileName = `PRODUCT-${Date.now()}-${Math.round(Math.random() * 1E9)}-cover.jpeg`

        await sharp(req.files.imageCover[0].buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/products/${coverfileName}`)

        req.body.imageCover = coverfileName


    }
    if (req.files.images) {
        req.body.images = []
        await Promise.all(
            req.files.images.map(async (img) => {
                const imageName = `PRODUCT-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`

                await sharp(img.buffer)
                    .resize(600, 600)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/products/${imageName}`)


                req.body.images.push(imageName)

            })
        )
        next()
    }

})



exports.imageUploaderBrand = uploadMultImage([

    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
])



// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
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
const asyncHandler = require('express-async-handler')

// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');

const slugify = require('slugify')
const multer = require('multer')
const brandModel = require('../models/brandModel')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')
const { uploadSingleImage } = require('../middleware/uploadImageMiddleWar')




const factory = require('./handlersFactory')


// MemoryStorage engine   buffer
// const storage = multer.memoryStorage()

// // wher image storage and rename image
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/brands')
//     },

//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split('/')[1]
//         const uniqueSuffix = `brand-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`
//         cb(null, uniqueSuffix)
//     }
// })


// validator if user upload image
// const multerFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true)
//     }
//     else {
//         cb(new ApiError('only image allow', 400), false)
//     }
// }



// const upload = multer({ storage: storage, fileFilter: multerFilter })



exports.resizeImage = asyncHandler(async (req, res, next) => {

    const fileName = `brand-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/brands/${fileName}`)

    req.body.image = fileName
    // console.log(req.file)
    next()
})


exports.imageUploaderBrand = uploadSingleImage("image")

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getBrand = factory.getAll(brandModel, 'brand');

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getBrandById = factory.getOne(brandModel);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.addBrand = factory.createOne(brandModel);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateBrand = factory.updateOne(brandModel);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteBrand = factory.deleteOne(brandModel);


















// exports.addBrand = asyncHandler(async (req, res) => {

//     const { name } = req.body

//     const newBrand = await brandModel.create({ name: name, slug: slugify(name) })
//     res.status(201).json({ data: newBrand })

// })




// exports.getBrand = asyncHandler(async (req, res) => {


//     //build query
//     const Documentscount = brandModel.countDocuments()

//     const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
//         .paginate(Documentscount)
//         .filter().
//         sort()
//         .limitFields()
//         .search('brand')

//     const { mongooseQuery, paginationResult } = apiFeatures

//     const brands = await mongooseQuery;


//     res.status(201).json({ results: brands.length, paginationResult, data: brands })


// })


// exports.getBrandById = asyncHandler(async (req, res, next) => {

//     const { id } = req.params

//     const brand = await brandModel.findById(id)

//     if (!brand) {
//         return next(new ApiError(`no category for this id : ${id}`, 404))
//     }
//     res.status(201).json({ data: brand })
// })

// exports.updateBrand = asyncHandler(async (req, res, next) => {
//     const { id } = req.params
//     const { name } = req.body
//     const brand = await brandModel.findByIdAndUpdate({ _id: id }, { name: name, slug: slugify(name) }, { new: true })

//     if (!brand) {
//         return next(new ApiError(`no category for this id : ${id}`, 404))
//     }
//     res.status(201).json({ data: brand })
// })

// exports.deleteBrand = asyncHandler(async (req, res, next) => {
//     const { id } = req.params

//     const brand = await brandModel.findByIdAndDelete(id)

//     if (!brand) {
//         return next(new ApiError(`no category for this id : ${id}`, 404))
//     }
//     res.status(201).json({ data: brand })
// })
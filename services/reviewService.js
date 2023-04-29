
const asyncHandler = require('express-async-handler')

// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');

const reviewsModel = require('../models/reviewsModel')


const { uploadSingleImage } = require('../middleware/uploadImageMiddleWar')

const factory = require('./handlersFactory')



// exports.resizeImage = asyncHandler(async (req, res, next) => {

//     const fileName = `review-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`

//     if (req.file) {
//         await sharp(req.file.buffer)
//             .resize(600, 600)
//             .toFormat('jpeg')
//             .jpeg({ quality: 90 })
//             .toFile(`uploads/review/${fileName}`)

//     }


//     req.body.image = fileName
//     // console.log(req.file)
//     next()
// })


// exports.imageUploaderReview = uploadSingleImage("image")




// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) filterObject = { product: req.params.productId };
    req.filterObj = filterObject;
    next();
};



// @desc    Get list of review
// @route   GET /api/v1/review
// @access  Public

// Build query
exports.getReview = factory.getAll(reviewsModel, 'review');

// @desc    Get specific reviw by id
// @route   GET /api/v1/review/:id
// @access  Public
exports.getReviewById = factory.getOne(reviewsModel);



//nested route create reviwe
exports.setProductIdUserIdToBody = (req, res, next) => {
    // Nested route (Create)
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
};

// @desc    Create reviw
// @route   POST  /api/v1/review
// @access  Private
exports.addReview = factory.createOne(reviewsModel);

// @desc    Update specific reviw
// @route   PUT /api/v1/review/:id
// @access  Private
exports.updateReview = factory.updateOne(reviewsModel);

// @desc    Delete specific reviw
// @route   DELETE /api/v1/review/:id
// @access  Private
exports.deleteReview = factory.deleteOne(reviewsModel);





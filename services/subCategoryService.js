
// const slugify = require('slugify')

// const asyncHandler = require('express-async-handler')
// const subCategoryModel = require('../models/subCategoryModel');
// const ApiError = require('../utils/apiError');
// const ApiFeatures = require('../utils/apiFeatures');




const factory = require('./handlersFactory')








const SubCategory = require('../models/subCategoryModel');

exports.setCategoryIdToBody = (req, res, next) => {
    // Nested route (Create)
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = { category: req.params.categoryId };
    req.filterObj = filterObject;
    next();
};

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);










// // @desc create  Subcategory
// // @route GET /api/v1/subcategoriies
// // @access Privet




// // middleware to set data
// exports.setCreateCategoryIdBody = (req, res, next) => {
//     if (!req.body.category) req.body.category = req.params.category
//     next()
// }




// exports.addSubCategory = asyncHandler(async (req, res) => {




//     const { name, category } = req.body;

//     console.log('add sub category')
//     const newsubCategory = await subCategoryModel.create({ name, slug: slugify(name), category })

//     res.status(201).json({ data: newsubCategory })
// }

// )


// // middleware to set data
// exports.setCategoryIdBody = (req, res, next) => {
//     // if there is requist to get subcategory by spicific category we will use this i
//     let filterObject = {};
//     if (req.params.category) filterObject = { category: req.params.category }

//     req.filterObj = filterObject;
//     next()
// }
// // @desc get All Subcategory
// // @route GET /api/v1/subcategoriies
// // @access Privet
// exports.getSubCategory = asyncHandler(async (req, res) => {

//     //build query
//     const Documentscount = subCategoryModel.countDocuments()

//     const apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
//         .paginate(Documentscount)
//         .filter().
//         sort()
//         .limitFields()
//         .search('category')

//     const { mongooseQuery, paginationResult } = apiFeatures

//     const allSubCategory = await mongooseQuery;


//     res.status(201).json({ resulte: allSubCategory.length, paginationResult, data: allSubCategory })

// })


// // // @desc get All Subcategory by category
// // // @route GET /api/v1/subcategoriies/:categoryId/subcategory
// // // @access Privet
// // exports.getSubCategorybyCategory = asyncHandler(async (req, res) => {

// //     const page = req.query.page || 1
// //     const limit = req.query.limit || 5
// //     const skip = (page - 1) * limit
// //     const allSubCategory = await subCategoryModel
// //         .find({ category: req.params.category }).skip(skip).limit(limit)
// //         .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle

// //     res.status(201).json({ resulte: allSubCategory.length, page, data: allSubCategory })

// // })


// // @desc get Subcategory by id
// // @route GET /api/v1/subcategoriies
// // @access Privet
// exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
//     const { id } = req.params;
//     const subcategory = await subCategoryModel.findById(id)
//         .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle

//     if (!subcategory) {
//         return next(new ApiError(`the is no subCategory with this id : ${id}`))
//     }
//     res.status(201).json({ data: subcategory })

// })



// exports.updateSubCategory = asyncHandler(async (req, res, next) => {
//     const name = req.body.name
//     const { id } = req.params;
//     const newUpdateSubcategory = await subCategoryModel.findByIdAndUpdate({ _id: id }, { name: name, slug: slugify(name) }, { new: true })
//         .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle

//     if (!newUpdateSubcategory) {
//         return next(new ApiError(`the is no subCategory with this id : ${id}`))
//     }
//     res.status(201).json({ data: newUpdateSubcategory })

// })

// exports.deletSubCategory = asyncHandler(async (req, res, next) => {

//     const { id } = req.params;
//     const deletedSubcategory = await subCategoryModel.findOneAndDelete(id)
//         .populate({ path: 'category', select: 'name -_id' }) // get data from parent modle

//     if (!deletedSubcategory) {
//         return next(new ApiError(`the is no subCategory with this id : ${id}`))
//     }
//     res.status(201).json({ data: deletedSubcategory })

// })
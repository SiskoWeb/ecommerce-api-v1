// ...rest of the initial code omitted for simplicity.

const asyncHandler = require('express-async-handler')

// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');

const multer = require('multer')
const slugify = require('slugify')
const categoryModel =  require('../models/categoryModel')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')

const factory = require('./handlersFactory')
//... services when add logic ---


const {uploadSingleImage} = require('../middleware/uploadImageMiddleWar')


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


// // validator if user upload image
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

    const fileName = `categories-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/categories/${fileName}`)
    req.body.image = fileName
    // console.log(req.file)
    next()
})

exports.imageUploaderCategory = uploadSingleImage("image")
// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getCategories = factory.getAll(categoryModel , 'category');

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(categoryModel);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.addtCategory = factory.createOne(categoryModel);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(categoryModel);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.deleteOne(categoryModel);








// // @desc Create category
// // @route POST /api/v1/categoriies
// // @access Privet
// exports.addtCategory = asyncHandler(async (req,res )=>{

//     const   name  = req.body.name;

//  const category = await  categoryModel.create({name ,slug:slugify(name)})
//   res.status(201).json({data : category})
 
     


//   }
// )
 
  


// // @desc get All category
// // @route GET /api/v1/categoriies
// // @access Privet
// exports.getCategories =asyncHandler(async (req,res)=>{
   
//     //build query
//     const documentsCounts = categoryModel.countDocuments()

//     const apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
//     .paginate(documentsCounts)
//         .filter().
//         sort()
//         .limitFields()
//         .search('category')

//     const { mongooseQuery, paginationResult } = apiFeatures

//     const category = await mongooseQuery;


//    res.status(201).json({results : category.length , paginationResult,data:category})

//         //search 


// }
// )

// // @desc get Spicific  category
// // @route GET /api/v1/categoriies/:id
// // @access Privet
// exports.getCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params
//   // pagination
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 5;
//   const skip = (page - 1) * limit;


//   const category = await categoryModel.findById(id)
//   if (!category) {
//     // res.status(404).json({msg:`no category for this id : ${id}`})
//     return next(new ApiError(`no category for this id : ${id}`, 404))
//   }
//   res.status(200).json({ data: category })



// }
// )




// // @desc update category
// // @route PUT /api/v1/categoriies/:id
// // @access Privet
// exports.updateCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const name = req.body.name;

//   const category = await categoryModel.findOneAndUpdate(
//     { _id: id },
//     { name: name, slug: slugify(name) },
//     { new: true }
//   );

//   if (!category) {
//     // res.status(404).json({msg:`no category for this id : ${id}`})
//     return next(new ApiError(`no category for this id : ${id}`, 404))

//   }
//   res.status(200).json({ data: category })

// }
// )





// // @desc deley category
// // @route PUT /api/v1/categoriies/:id
// // @access Privet
// exports.deletCategory = asyncHandler(async (req,res , next)=>{

//     const {id} = req.params;
    

    
//     const  category = await  categoryModel.findByIdAndDelete(id)
         
//        if(!category){
//         // res.status(404).json({msg:`no category for this id : ${id}`})
//         return   next( new ApiError(`no category for this id : ${id}` , 404))

//    }
//    res.status(201).json({ data:category})

//       }
//     )
     








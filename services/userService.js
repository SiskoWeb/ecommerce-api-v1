
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');

const slugify = require('slugify')
const multer = require('multer')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const userModele = require('../models/userModel')

const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')
const { uploadSingleImage } = require('../middleware/uploadImageMiddleWar')



const factory = require('./handlersFactory')



// create token by passing id user
const createToken = (payload) =>
    jwt.sign({ userId: payload }, "process.env.SECRET_KEY_JWT", {
        expiresIn: '90d'
    })

// MemoryStorage engine   buffer
// const storage = multer.memoryStorage()

// // wher image storage and rename image
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/Users')
//     },

//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split('/')[1]
//         const uniqueSuffix = `User-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`
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

    const fileName = `user-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`
    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/users/${fileName}`)

        req.body.photoImg = fileName
    }

    console.log(req.file)
    next()
})


exports.imageUploaderUser = uploadSingleImage("profileImg")

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getUser = factory.getAll(userModele, 'user');

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getUserById = factory.getOne(userModele);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createUser = factory.createOne(userModele);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
    const document = await userModele.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            profileImg: req.body.profileImg,
            role: req.body.role,
        },

        {
            new: true,
        });

    if (!document) {
        return next(
            new ApiError(`No document for this id ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ data: document });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteUser = factory.deleteOne(userModele);



// @desc    update only passowrd
// @route   update /changepassowrd/:id
// @access  Private

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const document = await userModele.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        },
        {
            new: true,
        }
    );

    if (!document) {
        return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});



///user-----------------------------


// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
  });


  // @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
    // 1) Update user password based user payload (req.user._id)
    const user = await userModele.findByIdAndUpdate(
      req.user._id,
      {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true,
      }
    );
  
    // 2) Generate token
    const token = createToken(user._id);
  
    res.status(200).json({ data: user, token });
  });
  
  // @desc    Update logged user data (without password, role)
  // @route   PUT /api/v1/users/updateMe
  // @access  Private/Protect
  exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
    const updatedUser = await userModele.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      { new: true }
    );
  
    res.status(200).json({ data: updatedUser });
  });
  
  // @desc    Deactivate logged user
  // @route   DELETE /api/v1/users/deleteMe
  // @access  Private/Protect
  exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
    await userModele.findByIdAndUpdate(req.user._id, { active: false });
  
    res.status(204).json({ status: 'Success' });
  });








// exports.addUser = asyncHandler(async (req, res) => {

//     const { name } = req.body

//     const newUser = await userModele.create({ name: name, slug: slugify(name) })
//     res.status(201).json({ data: newUser })

// })




// exports.getUser = asyncHandler(async (req, res) => {


//     //build query
//     const Documentscount = userModele.countDocuments()

//     const apiFeatures = new ApiFeatures(userModele.find(), req.query)
//         .paginate(Documentscount)
//         .filter().
//         sort()
//         .limitFields()
//         .search('User')

//     const { mongooseQuery, paginationResult } = apiFeatures

//     const Users = await mongooseQuery;


//     res.status(201).json({ results: Users.length, paginationResult, data: Users })


// })


// exports.getUserById = asyncHandler(async (req, res, next) => {

//     const { id } = req.params

//     const User = await userModele.findById(id)

//     if (!User) {
//         return next(new ApiError(`no category for this id : ${id}`, 404))
//     }
//     res.status(201).json({ data: User })
// })

// exports.updateUser = asyncHandler(async (req, res, next) => {
//     const { id } = req.params
//     const { name } = req.body
//     const User = await userModele.findByIdAndUpdate({ _id: id }, { name: name, slug: slugify(name) }, { new: true })

//     if (!User) {
//         return next(new ApiError(`no category for this id : ${id}`, 404))
//     }
//     res.status(201).json({ data: User })
// })

// exports.deleteUser = asyncHandler(async (req, res, next) => {
//     const { id } = req.params

//     const User = await userModele.findByIdAndDelete(id)

//     if (!User) {
//         return next(new ApiError(`no category for this id : ${id}`, 404))
//     }
//     res.status(201).json({ data: User })
// })
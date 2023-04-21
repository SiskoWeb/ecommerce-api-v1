const jwt = require('jsonwebtoken')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');


const asyncHandler = require('express-async-handler')

const userModele = require('../models/userModel')
const ApiError = require('../utils/apiError')

const createToken = (payload) =>
    jwt.sign({ userId: payload }, "process.env.SECRET_KEY_JWT", {
        expiresIn: '90d'
    })

// @DESC SIGNUP
// @ROUTE GET /API/V1/AUTH/SIGNUP
// @DACCESS PUBLIC
exports.signup = asyncHandler(async (req, res, next) => {
    //  1- create user
    console.log(process.env.SECRET_KEY_JWT)
    const user = await userModele.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    // 2 - create token
    const token = createToken(user._id)
    res.status(201).json({ data: user, token })
})

// @DESC LOGIN
// @ROUTE GET /API/V1/AUTH/LOGIN
// @DACCESS PUBLIC
exports.login = asyncHandler(async (req, res, next) => {

    //  1- check if login true

    const user = await userModele.findOne({ email: req.body.email })



    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError(`email or passowrd uncourrect`, 404));
    }

    // 2 - match token

    const token = createToken(user._id)

    res.status(200).json({ data: user, token })
})


// @DESC Lmake sure user is logged in
exports.protect = asyncHandler(async (req, res, next) => {

    //1)  check if token exist m if exist get it
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

    }
    if (!token) {
        return next(new ApiError('you are not login , please login to get access this route', 401))
    }



    // 2) verify token ( no change happens , expired token)

    const decoded = jwt.verify(token, "process.env.SECRET_KEY_JWT")


    // 3)  check if user exist 
    const currentUser = await userModele.findById(decoded.userId)

    if (!currentUser) {
        return next(new ApiError('the user that belong to this token does no longer exist', 401))
    }

    // 4) check if user change his password after token created
    if (currentUser.passwordChangedAt) {
        const passChangedTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10)

        console.log(passChangedTimestamp)
        console.log(decoded.iat)
        if (passChangedTimestamp > decoded.iat) {
            return next(new ApiError('user recently changed his password . please lohin again ...', 401))
        }


    }
    req.user = currentUser
    next()
})


// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You are not allowed to access this route', 403)
      );
    }
    next();
  });
const jwt = require('jsonwebtoken')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const asyncHandler = require('express-async-handler')

const userModele = require('../models/userModel')
const ApiError = require('../utils/apiError');
const sendEmail = require('../utils/sendEmail').default;


// create token by passing id user
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



// @desc    forget password
// @ROUTE GET /API/V1/AUTH/forgetpassword
// @DACCESS PUBLIC
exports.forgetPassword = asyncHandler(async (req, res, next) => {

    //1)get user email
    const user = await userModele.findOne({ email: req.body.email })
    if (!user) {
        return next(
            new ApiError(`There is no user with that email ${req.body.email}`, 403)
        );
    }

    //2) if user exist , generate hash random 6 digitls and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');

    console.log(resetCode)
    console.log(hashedResetCode)


    // Save hashed password reset code into db
    user.passwordResetCode = hashedResetCode;
    // Add expiration time for password reset code (10 min)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;

    await user.save();




    // 3) Send the reset code via email
    const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            message,
        });
    } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;

        await user.save();
        return next(new ApiError('There is an error in sending email', 500));
    }

    res
        .status(200)
        .json({ status: 'Success', message: 'Reset code sent to email' });
});


// @desc    verifyResetCode
// @ROUTE GET /API/V1/AUTH/verifyResetCode
// @DACCESS PUBLIC
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {

    // 1) get user based on reset code
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(req.body.resetCode)
        .digest('hex');

    const user = await userModele.findOne({
        passwordResetCode: hashedResetCode,
        passwordResetExpires: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ApiError('rest code invalide or expired'))
    }

    // 2) reset code valid
    user.passwordResetVerified = true;
    user.save()
    res.status(200).json({
        status: 'Success',
      });

})


// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user based on email
    const user = await userModele.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new ApiError(`There is no user with email ${req.body.email}`, 404)
      );
    }
  
    // 2) Check if reset code verified
    if (!user.passwordResetVerified) {
      return next(new ApiError('Reset code not verified', 400));
    }
  
    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
  
    await user.save();
  
    // 3) if everything is ok, generate token
    const token = createToken(user._id);
    res.status(200).json({ token });
  });


  // @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user based on email
    const user = await userModele.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new ApiError(`There is no user with email ${req.body.email}`, 404)
      );
    }
  
    // 2) Check if reset code verified
    if (!user.passwordResetVerified) {
      return next(new ApiError('Reset code not verified', 400));
    }
  
    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
  
    await user.save();
  
    // 3) if everything is ok, generate token
    const token = createToken(user._id);
    res.status(200).json({ token });
  });
const express = require('express')

const { signup, login, forgetPassword, verifyPassResetCode } = require('../services/authService')
const { createAuthalidator, LoginAuthalidator } = require('../utils/validators/authValidator')


const router = express.Router()



router.route('/signup')
    .post(createAuthalidator, signup)

router.route('/login')
    .post(LoginAuthalidator, login)

router.route('/forgetpassword')
    .post(forgetPassword)

router.route('/resetcode')
    .post(verifyPassResetCode)
// .get(getUser)


// router.route('/:id')
//     .put(imageUploaderUser, resizeImage, updateUser)
//     .delete(deleteUser)
//     .get(getUserById)




module.exports = router
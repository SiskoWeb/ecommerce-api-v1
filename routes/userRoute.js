const express = require('express')

const { createUser, updateUser, deleteUser, getUserById, getUser, imageUploaderUser, resizeImage, changeUserPassword } = require('../services/userService')
const { createUseralidator, changeUserPasswordValidator } = require('../utils/validators/userValidator')
const AuthService = require('../services/authService')


const router = express.Router()


router.put('/changepassowrd/:id', changeUserPasswordValidator, changeUserPassword)
router.route('/')
    .post(AuthService.protect, AuthService.allowedTo('admin', "manager"), imageUploaderUser, resizeImage, createUseralidator, createUser)
    .get(getUser)


router.route('/:id')
    .put(AuthService.protect, AuthService.allowedTo('admin', "manager"), imageUploaderUser, resizeImage, updateUser)
    .delete(AuthService.protect, AuthService.allowedTo('admin', "manager"), deleteUser)
    .get(getUserById)




module.exports = router
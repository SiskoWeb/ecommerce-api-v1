const express = require('express')

const { createUser, updateUser, deleteUser, getUserById, getUser, imageUploaderUser, resizeImage, changeUserPassword, getLoggedUserData, updateLoggedUserPassword, updateLoggedUserData, deleteLoggedUserData } = require('../services/userService')
const { createUseralidator, changeUserPasswordValidator, updateLoggedUserValidator } = require('../utils/validators/userValidator')
const AuthService = require('../services/authService')


const router = express.Router()



// user get his information
router.get('/getMe', AuthService.protect, getLoggedUserData, getUserById);
router.put('/changeMyPassword', AuthService.protect, updateLoggedUserPassword);
router.put('/updateMe', AuthService.protect, updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', AuthService.protect, deleteLoggedUserData);


// Admin
router.put('/changepassowrd/:id', changeUserPasswordValidator, changeUserPassword)
router.route('/')
    .post(AuthService.protect, AuthService.allowedTo('admin', "manager"), imageUploaderUser, resizeImage, createUseralidator, createUser)
    .get(getUser)


router.route('/:id')
    .put(AuthService.protect, AuthService.allowedTo('admin', "manager"), imageUploaderUser, resizeImage, updateUser)
    .delete(AuthService.protect, AuthService.allowedTo('admin', "manager"), deleteUser)
    .get(getUserById)




module.exports = router
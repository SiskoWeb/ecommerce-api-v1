const express = require('express')

const AuthService = require('../services/authService')
const { imageUploaderReview, resizeImage, setProductIdUserIdToBody, getReview, getReviewById, addReview, updateReview, deleteReview, createFilterObj } = require('../services/reviewService')
const {
    createReviewValidator,
    updateReviewValidator,
    getReviewValidator,
    deleteReviewValidator,
} = require('../utils/validators/reviewValidator');


const router = express.Router({ mergeParams: true })
// imageUploaderReview, resizeImage,

router.route('/')
    .post(AuthService.protect, AuthService.allowedTo("user"), setProductIdUserIdToBody, createReviewValidator, addReview)
    .get(getReview)

router.route('/:id')
    .put(AuthService.protect, AuthService.allowedTo("user"), updateReviewValidator, updateReview)
    .delete(AuthService.protect, AuthService.allowedTo('admin', "manager", "user"), deleteReviewValidator, deleteReview)
    .get(createFilterObj, getReviewValidator, getReviewById)


module.exports = router
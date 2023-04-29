const express = require('express');

const AuthService = require('../services/authService');

const {
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist,
} = require('../services/wishlistService');

const router = express.Router();

router.use(AuthService.protect, AuthService.allowedTo('user'));

router.route('/').post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

module.exports = router;
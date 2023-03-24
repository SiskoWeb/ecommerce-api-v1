const { check } = require('express-validator');
const validatorMiddlewar = require('../../middleware/validatorMiddlewar')


exports.getProductValidator = [
    check('id').isMongoId().withMessage('invalid Product id format'), validatorMiddlewar
]

exports.createProductalidator = [
    check('title').notEmpty().withMessage('Product Required')
        .isLength({ min: 2 }).withMessage('must be longer then 3 letter ')
        .isLength({ max: 32 }).withMessage('must be  max 32 letters'),
    check('description').notEmpty().withMessage('description Product Required')
        .isLength({ min: 20 }).withMessage('must be short then 3 letter ')
        .isLength({ max: 2000 }).withMessage('must be longer ')
    ,
    check('price').notEmpty().withMessage('description price Required')
        .isLength({ max: 20 }).withMessage('must be longer  ')
        .isNumeric().withMessage('price should be number')
    ,
    check('priceAfterDiscount')
        .optional()
        .isNumeric().withMessage('price should be number')
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price < value) {
                throw new Error('priceAfterDiscount must be lower the price')
            }
        })
    ,
    check('colors')
        .optional()
        .isArray()
        .withMessage('colors should be array of string')
    ,
    check('imageCover').notEmpty().withMessage('description price Required')
    ,
    check('images')
        .optional()
        .isArray()
        .withMessage('images should be array of string')
    ,
    check('category')
        .notEmpty().withMessage('Product must be belong to a category')
        .isMongoId().withMessage('invalid id formate')
    ,
    check('subcategory').optional().isMongoId().withMessage('invalid id formate')
    ,
    check('brand').optional().isMongoId().withMessage('invalid id formate')
    ,
    check('brand').optional().isMongoId().withMessage('invalid id formate')
    ,
    check('ratingsAverage').optional().isNumeric().withMessage('ratingsAverage MUST BE NUMBER')
        .isLength({ max: 5 }).withMessage(' ratingsAverage is longer ')
        .isLength({ min: 5 }).withMessage(' ratingsAverage is short ')
    ,
    check('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity MUST BE NUMBER')


    , validatorMiddlewar
]
exports.updatetProductalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Product id format')
    , validatorMiddlewar
]

exports.deletetProductalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Product id format')
    , validatorMiddlewar
]
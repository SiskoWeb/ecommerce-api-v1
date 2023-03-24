const { check } = require('express-validator');
const validatorMiddlewar = require('../../middleware/validatorMiddlewar')


exports.createSubCategoryValidator = [
    check('name').notEmpty().withMessage('subcategory required')
        .isLength({ min: 2 }).withMessage('to short')
        .isLength({ max: 30 }).withMessage('to long')
    , check('category').notEmpty().withMessage('category required')
    , check('category').isMongoId().withMessage('Invalid category id format')
    , validatorMiddlewar

]

exports.getSuvCategoryByIDValidator = [
    check('id').isMongoId()
        .withMessage('Invalid Subcategory id format')

    , validatorMiddlewar

]

exports.updateSuvCategoryByIDValidator = [
    check('id').isMongoId()
        .withMessage('Invalid Subcategory id format')

    , validatorMiddlewar

]

exports.deleteSubCategoryByIDValidator = [
    check('id').isMongoId()
        .withMessage('Invalid Subcategory id format')

    , validatorMiddlewar

]
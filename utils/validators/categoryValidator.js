const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddlewar = require('../../middleware/validatorMiddlewar')

// rules validator = https://youtu.be/Mn50B_dBYu4?list=PLDQ11FgmbqQNFuGQTKbAIGEyOKWUGBs6i
exports.getCategoryValidator = [
    check('id').isMongoId()
        .withMessage('Invalid category id format')
    , validatorMiddlewar
]

exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('category Required')
        .isLength({ min: 3 }).withMessage('must be longer then 3 letter ')
        .isLength({ max: 32 }).withMessage('must be  max 32 letters')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        })
    , validatorMiddlewar
]
exports.updatetCategoryValidator = [
    check('id').isMongoId()
        .withMessage('Invalid category id format'),

    body('name').optional().custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    })

    , validatorMiddlewar
]

exports.deletetCategoryValidator = [
    check('id').isMongoId()
        .withMessage('Invalid category id format')
    , validatorMiddlewar
]
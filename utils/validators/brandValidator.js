const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddlewar = require('../../middleware/validatorMiddlewar')


exports.getBrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id format'), validatorMiddlewar
]

exports.createBrandalidator = [
    check('name').notEmpty().withMessage('Brand Required')
        .isLength({ min: 2 }).withMessage('must be longer then 3 letter ')
        .isLength({ max: 32 }).withMessage('must be  max 32 letters')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        })

    , validatorMiddlewar
]
exports.updatetBrandalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Brand id format')
        ,
    body('name').optional().custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    })
    , validatorMiddlewar
]

exports.deletetBrandalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Brand id format')
    , validatorMiddlewar
]
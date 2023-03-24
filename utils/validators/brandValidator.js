const { check } = require('express-validator');
const validatorMiddlewar = require('../../middleware/validatorMiddlewar')


exports.getBrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id format'), validatorMiddlewar
]

exports.createBrandalidator = [
    check('name').notEmpty().withMessage('Brand Required')
        .isLength({ min: 2 }).withMessage('must be longer then 3 letter ')
        .isLength({ max: 32 }).withMessage('must be  max 32 letters')
    , validatorMiddlewar
]
exports.updatetBrandalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Brand id format')
    , validatorMiddlewar
]

exports.deletetBrandalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Brand id format')
    , validatorMiddlewar
]
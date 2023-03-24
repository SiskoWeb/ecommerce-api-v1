const { check  } = require('express-validator');
const validatorMiddlewar = require('../../middleware/validatorMiddlewar')

// rules validator = https://youtu.be/Mn50B_dBYu4?list=PLDQ11FgmbqQNFuGQTKbAIGEyOKWUGBs6i
exports.getCategoryValidator = [
    check('id').isMongoId()
    .withMessage('Invalid category id format')
    ,validatorMiddlewar
]

exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('category Required')
    .isLength({min:3 }).withMessage('must be longer then 3 letter ')
    .isLength({max:32 }).withMessage('must be  max 32 letters')
    ,validatorMiddlewar
]
exports.updatetCategoryValidator = [
    check('id').isMongoId()
    .withMessage('Invalid category id format')
    ,validatorMiddlewar
]

exports.deletetCategoryValidator = [
    check('id').isMongoId()
    .withMessage('Invalid category id format')
    ,validatorMiddlewar
]
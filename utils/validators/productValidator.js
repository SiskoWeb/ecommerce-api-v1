const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddlewar = require('../../middleware/validatorMiddlewar')
const categoryModel = require('../../models/categoryModel');
const subcategoryModel = require('../../models/subCategoryModel');
const subCategory = require('../../models/subCategoryModel')

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
        .isNumeric().withMessage('price should be number')
        .isLength({ max: 200000 }).withMessage('to long product price ')

    ,
    check('priceAfterDiscount')
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage('price should be number')

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
        .notEmpty().withMessage('category required')
        .isMongoId().withMessage('invalid id formate')

        .custom((value) =>
            categoryModel.findById(value).then(cat => {
                if (!cat) {
                    return Promise.reject(
                        new Error("no category with this id")

                    )

                }
            })

        )

    // .custom((categoryiD) =>
    //     categoryModel.findById(categoryiD).then(category => {

    //         if (!category) {
    //             return Promise.reject(
    //                 new Error(`no category with this id ${categoryiD}`)

    //             )

    //         }
    //     }
    //     )

    // )
    ,



    // custom( ()=> )


    check('subcategory')
        .optional()
        .
        isMongoId()
        .withMessage('invalid id formate')

        .custom((val, { req }) =>
            subcategoryModel.find({ category: req.body.category }).then(
                (subcategory) => {
                    const subCategoriesDB = []
                    subcategory.forEach((subCateItem) => {

                        subCategoriesDB.push(subCateItem._id.toString());
                    });
                    const checker = (target, arr) => target.every((v) => arr.includes(v))
                    if (!checker(val, subCategoriesDB)) {
                        return Promise.reject(
                            new Error('subCategory not belong to category')
                        )
                    }
                })
        )
    ,
    check('brand').optional().isMongoId().withMessage('invalid id formate')

    ,
    check('ratingsAverage').optional().isNumeric().withMessage('ratingsAverage MUST BE NUMBER')
        .isLength({ max: 5 }).withMessage(' ratingsAverage is longer ')
        .isLength({ min: 5 }).withMessage(' ratingsAverage is short ')
    ,
    check('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity MUST BE NUMBER')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        })

    , validatorMiddlewar
]
exports.updatetProductalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Product id format'),
    body('title').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    })
    , validatorMiddlewar
]

exports.deletetProductalidator = [
    check('id').isMongoId()
        .withMessage('Invalid Product id format')
    , validatorMiddlewar
]
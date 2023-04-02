const express = require('express')
const { addtCategory, getCategory, getCategories, updateCategory, deleteCategory, imageUploaderCategory, resizeImage } = require('../services/CategoryService');

const router = express.Router();
const { getCategoryValidator, createCategoryValidator, updatetCategoryValidator, deletetCategoryValidator } = require('../utils/validators/categoryValidator')

const subCategoryRoute = require('./subCategoryRoute')
// every  model or 7adat 3ndo route wa7d ms kanbedlo gha wach get ola post ...


// true but longer
// router.post('/', addtCategory)
// router.post('/', getCategory)

router.use('/:category/subcategories', subCategoryRoute)
//new one // https://youtu.be/Q2YJKLzI8MU?list=PLDQ11FgmbqQNFuGQTKbAIGEyOKWUGBs6i
router.route('/')
    .get(getCategories)
    .post(imageUploaderCategory, resizeImage, createCategoryValidator, addtCategory)


router.route('/:id')

    .get(
        getCategoryValidator,
        getCategory)

    .put(imageUploaderCategory, resizeImage,
        updatetCategoryValidator,
        updateCategory)

    .delete(
        deletetCategoryValidator,
        deleteCategory)

module.exports = router

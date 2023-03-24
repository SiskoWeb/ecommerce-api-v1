const express = require('express')
const { addtCategory, getCategory, getCategories, updateCategory, deletCategory } = require('../services/categoryService');

const router = express.Router();
const { getCategoryValidator, createCategoryValidator, updatetCategoryValidator, deletetCategoryValidator } = require('../utils/validators/ctegoryValidator')
const subCategoryRoute = require('./subCategoryRoute')
// every  model or 7adat 3ndo route wa7d ms kanbedlo gha wach get ola post ...


// true but longer
// router.post('/', addtCategory)
// router.post('/', getCategory)

router.use('/:category/subcategories', subCategoryRoute)
//new one // https://youtu.be/Q2YJKLzI8MU?list=PLDQ11FgmbqQNFuGQTKbAIGEyOKWUGBs6i
router.route('/')
    .get(getCategories)
    .post(createCategoryValidator, addtCategory)


router.route('/:id')

    .get(
        getCategoryValidator,
        getCategory)

    .put(
        updatetCategoryValidator,
        updateCategory)

    .delete(
        deletetCategoryValidator,
        deletCategory)

module.exports = router

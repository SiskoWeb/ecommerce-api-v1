const express = require('express')


// const router = express.Router()

// mergParams : Allow us to access parameters on othher routers
const router = express.Router({ mergeParams: true })

const {setCreateCategoryIdBody, setCategoryIdBody, addSubCategory, getSubCategory, getSubCategoryById, updateSubCategory, deletSubCategory, getSubCategorybyCategory } = require('../services/subCategoryService')
const { createSubCategoryValidator, getSuvCategoryByIDValidator, deleteSubCategoryByIDValidator, updateSuvCategoryByIDValidator } = require('../utils/validators/subCategoryValidator')



router.route('/')

    .post(setCreateCategoryIdBody, createSubCategoryValidator, addSubCategory)
    .get(setCategoryIdBody,getSubCategory)

router.route('/:id')

    .get(getSuvCategoryByIDValidator, getSubCategoryById)
    .put(updateSuvCategoryByIDValidator, updateSubCategory)
    .delete(deleteSubCategoryByIDValidator, deletSubCategory)




module.exports = router
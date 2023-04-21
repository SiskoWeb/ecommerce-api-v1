const express = require('express');

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require('../services/subCategoryService');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');
const AuthService = require('../services/authService')

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(AuthService.protect, AuthService.allowedTo('admin', "manager"),setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(AuthService.protect, AuthService.allowedTo('admin', "manager"),updateSubCategoryValidator, updateSubCategory)
  .delete(AuthService.protect, AuthService.allowedTo('admin', "manager"),deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;


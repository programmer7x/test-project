const express = require('express');
const authController = require('../../users/controllers/authController');
const validateBody = require('../../../middlewares/validateBody');
const { getAllCategories, createCategory, getOneCategory, deleteOneCategory, updateOneCategory } = require('../controllers/categoryController');
const createCategoryValidator = require('../validators/createCategoryValidator');

const categoryRouter = express.Router({mergeParams:true});

categoryRouter.route('/').get(getAllCategories).post(validateBody(createCategoryValidator), createCategory);

categoryRouter.route('/:categoryId').get(getOneCategory).delete(deleteOneCategory).patch(updateOneCategory)

module.exports = categoryRouter;
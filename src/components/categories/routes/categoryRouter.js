const express = require('express');
const categoryController = require('../controllers/categoryController');
const authcontroller = require('../../users/controllers/authController');
const validateBody = require('../../../middlewares/validateBody');

const categoryRouter = express.Router();

categoryRouter.route('/').get(categoryController.getAllCategories).post(categoryController.createCategory);

categoryRouter.route('/:categoryId')
    .get(categoryController.getOneCategory)
    .delete(authcontroller.protect, authcontroller.restrictTo('admin'), categoryController.deleteOneCategory)
    .patch(authcontroller.protect,authcontroller.restrictTo('admin'), categoryController.updateOneCategory);

module.exports = categoryRouter;
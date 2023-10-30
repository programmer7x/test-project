const express = require('express');
const userController = require('../controllers/userController');
const authcontroller = require('../controllers/authController');
const validateBody = require('../../../middlewares/validateBody');
const updateUserValidator = require('../validators/updateUserValidator');

const userRouter = express.Router();

userRouter.route('/').get(userController.getAllUsers);

userRouter.route('/:userId')
    .get(userController.getOne)
    .delete(authcontroller.protect, authcontroller.restrictTo('admin'), userController.deleteOneUser)
    .patch(authcontroller.protect,authcontroller.restrictTo('admin'), validateBody(updateUserValidator), userController.updateOneUser);

module.exports = userRouter;
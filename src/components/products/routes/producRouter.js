const express = require('express');
const authController = require('../../users/controllers/authController');
const validateBody = require('../../../middlewares/validateBody');
const productController = require('../controllers/productController');
const createProductValidator = require('../validator/createProductValidator');

const productRouter = express.Router({mergeParams:true});

productRouter.route('/')
    .post(validateBody(createProductValidator) ,productController.createProduct)
    .get(productController.getAllProducts);

productRouter.route('/:productId')
    .get(productController.getOneProduct)
    .delete(productController.deleteOneProduct)
    .patch(productController.updateOneProduct)

module.exports = productRouter;
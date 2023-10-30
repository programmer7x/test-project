const express = require('express');
const authController = require('../controllers/authController');
const validateBody = require('../../../middlewares/validateBody');
const loginValidator = require('../validators/loginValidator');
const signUpValidator = require('../validators/signUpValidator')

const authRouter = express.Router({mergeParams:true});

authRouter.route('/signup').post(validateBody(signUpValidator), authController.signUp)
authRouter.route('/login').post(validateBody(loginValidator), authController.login)

module.exports = authRouter;
const joi = require('joi');

const signUpSchema = joi.object({
    fullname: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().min(8).required()
})

module.exports = signUpSchema; 
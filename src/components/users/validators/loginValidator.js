const joi = require('joi');

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(8).required()
})

module.exports = loginSchema;
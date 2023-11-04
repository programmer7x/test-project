const joi = require('joi');

const updateUserSchema = joi.object({
    email: joi.string().email().optional(),
    fullname: joi.string().optional(),
    role: joi.string().valid('user', 'admin').optional()
})

module.exports = updateUserSchema; 
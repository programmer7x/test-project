const joi = require('joi');

const updateUserSchema = joi.object({
    email: joi.string().required().email().optional(),
    role: joi.string().valid('user', 'admin').optional()
})

module.exports = updateUserSchema; 
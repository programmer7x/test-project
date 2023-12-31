const joi = require('joi');

const createProductValidator = joi.object({
    title: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string().optional(),
    categoryId: joi.number().optional()
})

module.exports = createProductValidator; 
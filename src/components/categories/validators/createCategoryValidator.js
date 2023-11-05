const joi = require('joi');

const createCategoryValidator = joi.object({
    name: joi.string().required(),
    parent_category_id: joi.number().optional(),
})

module.exports = createCategoryValidator; 
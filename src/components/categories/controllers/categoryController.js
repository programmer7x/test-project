const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/AppError');
const Category = require('../model/Category');
const Product = require('../../products/model/Product');
const ProductCategory = require('../../products/model/ProductCategory')

exports.createCategory = catchAsync(async (req, res ,next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        message: "category id createdd successfully",
        data: {
            newCategory: newCategory.rows[0]
        }
    })
});

exports.getAllCategories = catchAsync(async (req, res ,next) => {
    const categories = await Category.findAll();

    res.status(200).json({
        status: 'success',
        message: "all categories are fetched successfully!",
        data: {
            categories: categories.rows
        }
    })
})

exports.getOneCategory = catchAsync(async (req, res ,next) => {
    const {categoryId} = req.params;

    const category = await Category.findById(categoryId);

    if(!category.rows[0]) {
        throw new AppError('category is not exist by this id!', 404);
    }

    res.status(200).json({
        status: 'success',
        message: "category is found successfully!",
        data: {
            category: category.rows[0]
        }
    })
});

exports.deleteOneCategory = catchAsync(async (req, res ,next) => {
    const {categoryId} = req.params;

    const productsBelongsToCategory = await ProductCategory.countProductsBelongsToACategoryByCategoryId(Number(categoryId));

    console.log({productsBelongsToCategory})
    
    console.log(productsBelongsToCategory.rows)
    console.log(Number(productsBelongsToCategory.rows[0].count))

    if(Number(productsBelongsToCategory.rows[0].count) != 0) {
        throw new AppError('you can not delete category while products belongs to this category still exist.', 400)
    }
        
    const category = await Category.findByIdAndDelete(categoryId)

    if(!category.rows[0]) {
        throw new AppError('category is not exist by this id!', 404);
    }

    res.status(204).json({
        status: 'success',
        message: "category is removed successfully!",
        data: {
            category
        }
    })
});

exports.updateOneCategory = catchAsync(async (req, res ,next) => {
    const { categoryId } = req.params;
    
    const updatedCategory = await Category.findByIdAndupdate(categoryId ,req.body);

    if(!updatedCategory.rows[0]) {
        throw new AppError('category is not exist by this id!', 404);
    }

    res.status(200).json({
        status: 'success',
        message: "category is updated successfully!",
        data: {
            updatedCategory: updatedCategory.rows[0]
        }
    })
});

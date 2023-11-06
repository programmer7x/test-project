const catchAsync = require('../../../utils/catchAsync');
const {Category} = require('./../../../connectionDB');
const AppError = require('../../../utils/AppError');

exports.createCategory = catchAsync(async(req,res,next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status:'success',
        message: 'category is created successfully!',
        data: {
            newCategory
        }
    })
})


exports.getAllCategories = catchAsync(async(req,res,next) => {
    const categories = await Category.findAll();

    res.status(200).json({
        status:'success',
        message: 'all categories are fetched!',
        data: {
            categories
        }
    })
})

exports.getOneCategory = catchAsync(async(req,res,next) => {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId)

    if(!category) {
        throw new AppError('category is not found by this id!', 404)
    }

    res.status(200).json({
        status: 'success',
        message: "category is found successfully!",
        data: {
            category
        }
    })
})

exports.deleteOneCategory = catchAsync(async(req,res,next) => {
    const { categoryId } = req.params;

    const removedCategory = await Category.destroy({
        where: {
            id: categoryId
        }
    });

    if(!removedCategory) {
        throw new AppError('category is not found by this id', 404);
    }

    res.status(204).json({
        status: 'success',
        message: 'category is removed successfully!',
        data: {
            removedCategory
        }
    })
})

exports.updateOneCategory = catchAsync(async(req,res,next) => {
    const { categoryId } = req.params;


    const [rowChanged,updatedCategory] = await Category.update(req.body, {
        where: {id: categoryId},
        returning: true,
    }) 

    if(!updatedCategory) {
        throw new AppError('category is not found by this id', 404)
    }

    res.status(200).json({
        status: 'success',
        message: 'category is updated successfully!',
        data: {
            updatedCategory
        }
    })
});


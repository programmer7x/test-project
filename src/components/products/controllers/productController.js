const catchAsync = require('../../../utils/catchAsync');
const { Product, Category } = require('../../../connectionDB');
const AppError = require('../../../utils/AppError')

exports.createProduct = catchAsync(async (req, res ,next) => {
    const { categoryId } = req.body
    const newProduct = await Product.create(req.body);

    if(categoryId) {
        const category = await Category.findByPk(req.body.categoryId);

        if(!category) {
            throw new AppError('category is not found by this id!', 404)
        }

        const result = await newProduct.addCategories(category);
    }
    

    res.status(201).json({
        status: 'success',
        message: "product id createdd successfully",
        data: {
            newProduct
        }
    })
});

exports.getAllProducts = catchAsync(async (req, res ,next) => {
    const products = await Product.findAll();

    res.status(200).json({
        status: 'success',
        message: "all products are fetched successfully!",
        data: {
            products
        }
    })
})

exports.getOneProduct = catchAsync(async (req, res ,next) => {
    const {productId} = req.params;

    const product = await Product.findByPk(productId);

    if(!product) {
        throw new AppError('product is not exist by this id!', 404);
    }

    res.status(200).json({
        status: 'success',
        message: "product is found successfully!",
        data: {
            product
        }
    })
});

exports.deleteOneProduct = catchAsync(async (req, res ,next) => {
    const { productId } = req.params;

    const product = await Product.destroy({
        where: {
            id: productId
        }
    });

    if(!product) {
        throw new AppError('product is not exist by this id!', 404);
    }

    res.status(204).json({
        status: 'success',
        message: "product is removed successfully!",
        data: {
            product
        }
    })
});

exports.updateOneProduct = catchAsync(async (req, res ,next) => {
    const { productId } = req.params;
    
    const [rowCount , product] = await Product.update(req.body, {
        where: {
            id: productId
        },
        returning: true,
    });

    if(!product) {
        throw new AppError('product is not exist by this id!', 404);
    }

    res.status(200).json({
        status: 'success',
        message: "product is updated successfully!",
        data: {
            product
        }
    })
});


 
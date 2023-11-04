const catchAsync = require('../../../utils/catchAsync');
const Product = require('../model/Product');
const AppError = require('../../../utils/AppError');
const ProductCategory = require('../model/ProductCategory');

exports.createProduct = catchAsync(async (req, res ,next) => {
    const { categoryId } = req.body;
    const newProduct = await Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });

    const productCategory = await ProductCategory.create({
        product_id: newProduct.rows[0].id,
        category_id: categoryId
    })

    console.log({productCategory})

    res.status(201).json({
        status: 'success',
        message: "product id createdd successfully",
        data: {
            newProduct: newProduct.rows[0]
        }
    })
});

exports.getAllProducts = catchAsync(async (req, res ,next) => {
    const products = await Product.findAll();

    res.status(200).json({
        status: 'success',
        message: "all products are fetched successfully!",
        data: {
            products: products.rows[0]
        }
    })
})

exports.getOneProduct = catchAsync(async (req, res ,next) => {
    const {productId} = req.params;

    const product = await Product.findById(productId);

    if(!product.rows[0]) {
        throw new AppError('product is not exist by this id!', 404);
    }

    res.status(200).json({
        status: 'success',
        message: "product is found successfully!",
        data: {
            product: product.rows[0]
        }
    })
});

exports.deleteOneProduct = catchAsync(async (req, res ,next) => {
    const {productId} = req.params;

    const product = await Product.findByIdAndDelete(productId)

    if(!product.rows[0]) {
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
    
    const updatedProduct = await Product.findByIdAndupdate(productId ,req.body);

    if(!updatedProduct.rows[0]) {
        throw new AppError('product is not exist by this id!', 404);
    }

    res.status(200).json({
        status: 'success',
        message: "product is updated successfully!",
        data: {
            updatedProduct: updatedProduct.rows[0]
        }
    })
});


 
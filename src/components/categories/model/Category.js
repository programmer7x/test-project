const {Sequelize, DataTypes, Model} = require('sequelize')
const Product = require('../../products/model/Product');

const defineCategory = (sequelize, Product) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentCategoryId: {
            type: DataTypes.INTEGER,
        }
    });

    return Category;
}



// Category.belongsToMany(Product, {
//     through: 'ProductCategory', // Use the same junction table
//     foreignKey: 'categoryId', // The foreign key in the junction table that references Category
//     // otherKey: 'productId', // The foreign key in the junction table that references Product
// });

// Category.hasMany(Category, {
//     as: 'subCategories',
//     foreignKey: 'parentCategoryId',
// });

// Category.belongsTo(Category, {
//     as: 'parentCategory',
//     foreignKey: 'parentCategoryId',
// });


module.exports = defineCategory;
const {Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../../../connectionDB');
const Product = require('../../products/model/Product');

class Category extends Model {} // Extending Sequelize's Model class
Category.init({
  // Your Category model fields here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    parentCategoryId: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE,
        default: Date.now
    }
}, {
  sequelize,
  modelName: 'Category',
  // Other options
});

// const Category = sequelize.define('Category', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     parentCategoryId: {
//         type: DataTypes.INTEGER
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         default: Date.now
//     }
// });


// Category.belongsToMany(Product, {
//     through: 'ProductCategory', // Use the same junction table
//     foreignKey: 'categoryId', // The foreign key in the junction table that references Category
//     otherKey: 'productId', // The foreign key in the junction table that references Product
// });

Category.hasMany(Category, {
    as: 'subCategories',
    foreignKey: 'parentCategoryId',
});

Category.belongsTo(Category, {
    as: 'parentCategory',
    foreignKey: 'parentCategoryId',
});

module.exports = Category;
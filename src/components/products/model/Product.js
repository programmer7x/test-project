const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../connectionDB');
const Category = require('../../categories/model/Category');

class Product extends Model {} // Extending Sequelize's Model class
Product.init({
  // Your Product model fields here
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    }
}, {
  sequelize,
  modelName: 'Product',
  // Other options
});

// const Product = sequelize.define('Product', {
//     id: {
//         type: DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     desc: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     price: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: Date.now
//     }
// });

Product.belongsToMany(Category, {
    through: 'ProductCategory', // Use the junction table
    foreignKey: 'productId', // The foreign key in the junction table that references Product
    otherKey: 'categoryId', // The foreign key in the junction table that references Category
});

module.exports = Product;
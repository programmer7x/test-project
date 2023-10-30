const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../../../connectionDB');
const Product = require('../../products/model/Product');

const Category = sequelize.define('Category', {
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
})

Category.hasMany(Category, {
    as: 'subCategories',
    foreignKey: 'parentCategoryId',
});

Category.belongsTo(Category, {
    as: 'parentCategory',
    foreignKey: 'parentCategoryId',
});

Category.belongsToMany(Product, { through: 'ProductCategory' });

module.exports = Category;
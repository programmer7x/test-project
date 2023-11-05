const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../connectionDB');
const Category = require('../../categories/model/Category');
const Product = require('./Product');

class ProductCategory extends Model {} // Extending Sequelize's Model class
ProductCategory.init({
    
}, {
  sequelize,
  modelName: 'ProductCategory',
  // Other options
});

// ProductCategory.hasMany(Category)
// ProductCategory.hasMany(Product)

(async() => {
    await sequelize.sync({force: true})
})()

module.exports = ProductCategory;
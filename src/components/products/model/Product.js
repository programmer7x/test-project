const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../connectionDB');
const Category = require('../../categories/model/Category');

function defineProduct (sequelize, Category) {
    const Product = sequelize.define('Product', {
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
        }
    });

    return Product;
}

module.exports = defineProduct;
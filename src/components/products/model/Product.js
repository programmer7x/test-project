const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../connectionDB');
const Category = require('../../categories/model/Category');


const Product = sequelize.define('Product', {
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
});

Product.belongsToMany(Category, { through: 'ProductCategory' });

module.exports = Product;
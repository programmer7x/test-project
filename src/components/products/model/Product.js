const { compareSync } = require('bcrypt');
const client = require('../../../connectionDB')
const AppError = require('../../../utils/AppError')

class Product {
    constructor() {}

    static async create (options) {
        const keys = Object.keys(options);
        const values = Object.values(options)

        const queryStr = `INSERT INTO products (${keys.join(', ')}) VALUES (${values.map((key, i) => `$${i + 1}`)}) RETURNING *;`;

        return client.query(queryStr, values);
    }

    static async findAll (options) {
        const queryStr = `SELECT * FROM products;`;
        return client.query(queryStr);
    }

    static async findById (productId) {
        const queryStr = `SELECT * FROM products WHERE id = $1;`;
        const values = [productId]
        return client.query(queryStr, values);
    }

    static async findByCategory (categoryId) {
        const queryStr = `SELECT * FROM products WHERE category_id = $1;`;
        const values = [categoryId]
        return client.query(queryStr, values);
    }

    static async findByIdAndDelete(productId) {
        const queryStr = `DELETE FROM products WHERE id = $1 RETURNING *;`;
        const values = [Number(productId)]
        return client.query(queryStr, values);
    }

    static async findByIdAndupdate (productId, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const queryStr = `UPDATE products SET ${keys.map((key, i) => `${key} = $${i + 1}`).join(' ')} WHERE id = ${productId} RETURNING *;`;

        return client.query(queryStr, values);
    }
} 

module.exports = Product;
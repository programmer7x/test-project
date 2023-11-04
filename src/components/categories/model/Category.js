const client = require('../../../connectionDB')
const AppError = require('../../../utils/AppError')

class Category {
    constructor() {}

    static async create (options) {
        const keys = Object.keys(options);
        const values = Object.values(options)

        const queryStr = `INSERT INTO categories (${keys.join(', ')}) VALUES (${values.map((key, i) => `$${i + 1}`)}) RETURNING *;`;

        return client.query(queryStr, values);
    }

    static async findAll (options) {
        const queryStr = `SELECT * FROM categories;`;
        return client.query(queryStr);
    }

    static async findById (categoryId) {
        const queryStr = `SELECT * FROM categories WHERE id = $1;`;
        const values = [categoryId]
        return client.query(queryStr, values);
    }

    static async findByIdAndDelete(categoryId) {
        const queryStr = `DELETE FROM categories WHERE id = $1 RETURNING *;`;
        const values = [Number(categoryId)]
        return client.query(queryStr, values);
    }

    static async findByIdAndupdate (categoryId, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const queryStr = `UPDATE categories SET ${keys.map((key, i) => `${key} = $${i + 1}`).join(' ')} WHERE id = ${categoryId} RETURNING *;`;

        return client.query(queryStr, values);
    }
} 

module.exports = Category;
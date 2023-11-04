const { compareSync } = require('bcrypt');
const client = require('../../../connectionDB')
const AppError = require('../../../utils/AppError')

class User {
    constructor() {}

    static async create (options) {
        const keys = Object.keys(options);
        const values = Object.values(options)

        const queryStr = `INSERT INTO users (${keys.join(', ')}) VALUES (${values.map((key, i) => `$${i + 1}`)}) RETURNING *;`;

        return client.query(queryStr, values);
    }

    static async findAll (options) {
        const queryStr = `SELECT * FROM users;`;
        return client.query(queryStr);
    }

    static async findById (userId) {
        const queryStr = `SELECT * FROM users WHERE id = $1;`;
        const values = [userId]
        return client.query(queryStr, values);
    }

    static async findByIdAndDelete(userId) {
        const queryStr = `DELETE FROM users WHERE id = $1 RETURNING *;`;
        const values = [Number(userId)]
        return client.query(queryStr, values);
    }

    static async findByEmail(email) {
        const queryStr = `SELECT * FROM users WHERE email = $1;`;
        const values = [email]
        return client.query(queryStr, values);
    }

    static async findByIdAndupdate (userId, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const queryStr = `UPDATE users SET ${keys.map((key, i) => `${key} = $${i + 1}`).join(' ')} WHERE id = ${userId} RETURNING *;`;

        return client.query(queryStr, values);
    }

    static async comparePassword (password, userPassword) {
        return password == userPassword;
    }
} 

module.exports = User;
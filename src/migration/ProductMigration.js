const client = require('../connectionDB.js')

const dropProductTable = () => `
    DROP TABLE IF EXISTS products;
`

const createProductTable = () => `
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

client.query(dropProductTable())
client.query(createProductTable())
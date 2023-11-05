// const client = require('../connectionDB.js');

const {Client} = require('pg')

const client = new Client({
    user: "clead",
    host: "localhost",
    database: "pg",
    password: "programmer_7",
    port: 5432
});

client.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected To Db Successfully");
})


const droptCategoryTable = () => `
    DROP TABLE IF EXISTS categories;
`

const createCategoryMigration = () => `
    CREATE TABLE IF NOT EXISTS categories(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        parent_category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_category_id) REFERENCES categories(id)
)`

client.query(droptCategoryTable())
client.query(createCategoryMigration())
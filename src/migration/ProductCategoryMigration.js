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


const droptProductCategoryTable = () => `
    DROP TABLE IF EXISTS ProductCategory;
`

const createProductCategoryMigration = () => `
    CREATE TABLE ProductCategory (
    product_id BIGINT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);`


client.query(droptProductCategoryTable())
client.query(createProductCategoryMigration())
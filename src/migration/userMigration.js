// const client = require('../connectionDB')

const {Client} = require('pg');

const client = new Client({
    user: "clead",
    host: "localhost",
    database: "pg",
    password: "programmer_7",
    port: 5432
})

client.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected To Db Successfully");
})

const dropUserTable = () => `DROP TABLE IF EXISTS "users";`

const createUserTable = () => `
CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    passwordConfirm TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);`;


client.query(dropUserTable())
client.query(createUserTable())
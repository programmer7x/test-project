const Sequelize = require('sequelize');
const defineCategory = require('./components/categories/model/Category');
const defineProduct = require('./components/products/model/Product');
const defineUser = require('./components/users/model/User');

const sequelize = new Sequelize({
    dialect: 'postgres', // Use 'postgres' for PostgreSQL
    host: 'localhost', // Your database host
    port: 5432, // Your database port
    username: 'clead', // Your database username
    password: 'programmer_7', // Your database password
    database: 'test-project', // Your database name
    logging: false
  });

sequelize.authenticate().then(() => {
    console.log('database is connected successsfully...');
}).catch(error => {
    console.error('Unable to connect to the database:', error);

});

const Category = defineCategory(sequelize);
const Product = defineProduct(sequelize);
const User = defineUser(sequelize)

Category.belongsToMany(Product, {
    through: 'ProductCategory', // Use the same junction table
    foreignKey: 'categoryId', // The foreign key in the junction table that references Category
    otherKey: 'productId', // The foreign key in the junction table that references Product
});

Product.belongsToMany(Category, {
    through: 'ProductCategory', // Use the junction table
    foreignKey: 'productId', // The foreign key in the junction table that references Product
    otherKey: 'categoryId', // The foreign key in the junction table that references Category
});

sequelize.sync().then(result => {
    console.log('sequlize is synced now!');
}).catch(err => {
    console.log(err);
});


module.exports = {
    Product,
    Category,
    User
};
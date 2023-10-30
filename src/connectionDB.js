const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://clead:programmer_7@localhost:5432/test-project');

sequelize.authenticate().then(() => {
    console.log('database is connected successsfully..');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

sequelize.sync().then(result => {
    console.log('sequlize is synced now!');
}).catch(err => {
    console.log(err);
});



module.exports = sequelize;
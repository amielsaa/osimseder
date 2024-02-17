const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    "username": "root",
    "password": "password",
    "database": "osimseder-test",
    "host": "postgres-test",
    "dialect": "postgres"
});

module.exports = sequelize;

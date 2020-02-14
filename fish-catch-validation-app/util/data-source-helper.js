const {Sequelize, DataTypes} = require('sequelize');

const helper = new Sequelize('fish_catch_report_db', 'root', 'abc123', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: { connectTimeout: 1000 } // mariadb connector option
});

module.exports = { helper, Sequelize, DataTypes};
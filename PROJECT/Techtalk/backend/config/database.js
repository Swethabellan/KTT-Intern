const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("Techtalk", "postgres", "SwethaBellan", {
    host : 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
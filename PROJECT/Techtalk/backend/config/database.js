const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("Techtalk", "postgres", "SwethaBellan", {
    host : 'localhost',
    dialect: 'postgres',
    logging:false
});

module.exports = sequelize;
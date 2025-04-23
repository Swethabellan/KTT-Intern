const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Answers = sequelize.define('Answers', {
  questionId: {
     type: DataTypes.INTEGER, 
     allowNull: false },
  userId: {
     type: DataTypes.INTEGER, 
     allowNull: false },
  content: { 
    type: DataTypes.TEXT, 
    allowNull: false }
});

module.exports = Answers;
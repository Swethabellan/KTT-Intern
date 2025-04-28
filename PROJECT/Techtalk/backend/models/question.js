const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  upvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  downvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

}, {
  tableName: 'questions', 
  timestamps: true
});

Question.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Question, { foreignKey: 'userId' });

module.exports = Question;

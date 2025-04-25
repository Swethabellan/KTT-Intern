const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Question = sequelize.define('Question', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.BOOLEAN, defaultValue: false },
  answeredBy: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] }
}, { timestamps: true });

User.hasMany(Question, { foreignKey: 'userId' });
Question.belongsTo(User, { foreignKey: 'userId' });

module.exports = Question;
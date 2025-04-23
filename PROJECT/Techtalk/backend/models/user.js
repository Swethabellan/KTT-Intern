const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: { 
    type: DataTypes.STRING,
     allowNull: false, 
     unique: true },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false,
     unique: true },
  password: { 
    type: DataTypes.STRING,
     allowNull: false },
  name: {
     type: DataTypes.STRING,
      allowNull: false },
  role: {
     type: DataTypes.STRING,
      allowNull: false },
  team: {
     type: DataTypes.STRING,
      allowNull: false },
  bio: { 
    type: DataTypes.TEXT },
  skills: {
     type: DataTypes.STRING }
}, { timestamps: false });

module.exports = User;
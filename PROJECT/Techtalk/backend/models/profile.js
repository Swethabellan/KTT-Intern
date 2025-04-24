const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '' 
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '' 
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '' 
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  }
}, {
  timestamps: false 
});

module.exports = Profile;
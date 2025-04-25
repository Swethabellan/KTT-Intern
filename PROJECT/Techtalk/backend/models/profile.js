const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Profile = sequelize.define('Profile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  profilePicture: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  location: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  website: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  github: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  linkedin: { type: DataTypes.STRING, allowNull: true, defaultValue: '' }
}, { timestamps: true });

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;
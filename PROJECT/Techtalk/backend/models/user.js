const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: { isEmail: true }
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bio: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: ''
		},
		skills: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull:true
		},
		badges: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}

	}, { timestamps: true, 
		tableName: 'Users' 
	}, {
		classMethods: {
			associate: function (models) {

			}
		}
	});
1
	User.associate = (models) => {
        User.hasMany(models.Question, { foreignKey: 'userId' });
        User.hasMany(models.Answer, { foreignKey: 'userId' });
    };

	return User;
};
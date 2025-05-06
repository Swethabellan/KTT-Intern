const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const UserRole = sequelize.define('UserRole', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
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
		website: {
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
		},

	}, {
		timestamps: true,
		tableName: 'UserRole'
	});

	UserRole.associate = (models) => {
		UserRole.belongsTo(models.User);
	};

	return UserRole;
};
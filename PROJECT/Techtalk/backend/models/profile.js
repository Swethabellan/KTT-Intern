const { DataTypes, Association } = require('sequelize');

module.exports = (sequelize) => {
	const Question = sequelize.define('Profile', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
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
		tableName: 'Profiles'
	}, {
		classMethods: {
			associate: function (models) {
			
			}
			
		}
	});

	return Question;
};

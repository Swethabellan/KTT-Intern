const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
	const Question = sequelize.define('Question', {
		id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        dislikes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        comments: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }

	}, {
		timestamps: true,
		tableName: 'Questions'
	});

    Question.associate = (models) => {
        Question.belongsTo(models.User);
        Question.hasMany(models.Answer);
    };

	return Question;
};
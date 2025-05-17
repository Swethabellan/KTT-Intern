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
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comments: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        flagged: { 
            type: Sequelize.BOOLEAN, 
            defaultValue: false }

	}, {
		timestamps: true,
		tableName: 'Questions'
	});

   Question.associate = (models) => {
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
};
	return Question;
};



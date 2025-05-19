const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Answer = sequelize.define('Answer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        questionId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW 
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        isCorrect: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },{
         
        timestamps: true,
        tableName: 'Answers'
    });
        
    


    Answer.associate = (models) => {
        Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
        Answer.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Answer;
};
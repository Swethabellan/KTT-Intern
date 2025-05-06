const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Answer = sequelize.define('Answer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Questions',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'Answers'
    }, {
        classMethods: {
            associate: function (models) {
                Answer.belongsTo(models.Question);
                Answer.hasOne(models.User);
            }

        }
    });

    Answer.associate = (models) => {
        Answer.belongsTo(models.User);
        Answer.belongsTo(models.Question);
    }; 

    return Answer;
};
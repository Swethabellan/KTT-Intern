const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Skill = sequelize.define('Skill', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Skills',
        timestamps: false
    });

    return Skill;
};
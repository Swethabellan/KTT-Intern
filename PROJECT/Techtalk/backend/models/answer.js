const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Question = require('./question');

// const Answer = sequelize.define('Answer', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   questionId: { type: DataTypes.INTEGER, allowNull: false },
//  
//   content: { type: DataTypes.TEXT, allowNull: false }
// }, { timestamps: true });


const Answer = sequelize.define('Answer', {
 
  
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'questions', 
      key: 'id' 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  // userId: { type: DataTypes.INTEGER, allowNull: false },
 
  content: { type: DataTypes.TEXT, allowNull: false }
}, {
  tableName: 'answers'
});
User.hasMany(Answer, { foreignKey: 'userId' });
Answer.belongsTo(User, { foreignKey: 'userId' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

module.exports = Answer;

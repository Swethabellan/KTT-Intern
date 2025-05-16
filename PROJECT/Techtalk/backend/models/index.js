
const { Sequelize } = require('sequelize');
const QuestionModel = require('./Question');
const UserModel = require('./User');
const AnswerModel = require('./Answer');

const sequelize = new Sequelize(`postgres://postgres:SwethaBellan@localhost:5432/techtalk`, {
    dialect: 'postgres',
    logging: true,
});
const models = {
    Question: QuestionModel(sequelize),
    User: UserModel(sequelize),
    Answer: AnswerModel(sequelize)
};
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});
module.exports = {
    sequelize,
    ...models
};
const Question = require('../models/Question');
const User = require('../models/User');
const Answer = require('../models/Answer');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [{ model: User, attributes: ['id', 'username'] }]
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createQuestion = async (req, res) => {
  const { title, description } = req.body;
  try {
    const question = await Question.create({
      title,
      description,
      userId: req.user.id
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTotalQuestions = async (req, res) => {
  try {
    const totalQuestions = await Question.count();
    res.json({ totalQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAnsweredQuestions = async (req, res) => {
  try {
    const answeredQuestions = await Question.count({
      where: {
        id: {
          [require('sequelize').Op.in]: await Answer.findAll({
            attributes: ['questionId'],
            group: ['questionId']
          }).then(answers => answers.map(a => a.questionId))
        }
      }
    });
    res.json({ answeredQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUnansweredQuestions = async (req, res) => {
  try {
    const totalQuestions = await Question.count();
    const answeredQuestions = await Question.count({
      where: {
        id: {
          [require('sequelize').Op.in]: await Answer.findAll({
            attributes: ['questionId'],
            group: ['questionId']
          }).then(answers => answers.map(a => a.questionId))
        }
      }
    });
    const unansweredQuestions = totalQuestions - answeredQuestions;
    res.json({ unansweredQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.count();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
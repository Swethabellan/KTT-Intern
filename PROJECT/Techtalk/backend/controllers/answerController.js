const Answer = require('../models/Answer');
const Question = require('../models/Question');
const User = require('../models/User');

exports.getAnswers = async (req, res) => {
  const { questionId } = req.query;
  try {
    const answers = await Answer.findAll({
      where: { questionId },
      include: [{ model: User, attributes: ['id', 'username'] }]
    });
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createAnswer = async (req, res) => {
  const { questionId, content } = req.body;
  try {
    const answer = await Answer.create({
      content,
      questionId,
      userId: req.user.id
    });
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Question, attributes: ['id', 'title'] }
      ]
    });
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
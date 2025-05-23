const { User,Question,Answer } = require('../models');
const { Op } = require('sequelize');


const createAnswer= async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User authentication failed' });
        }

        const { questionId, content } = req.body;
        if (!questionId || !content) {
            return res.status(400).json({ error: 'Question ID and content are required' });
        }

        const question = await Question.findOne({ where: { id: questionId } });
        if (!question) return res.status(404).json({ error: 'Question not found' });

        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: `User not found for ID: ${req.user.id}` });
        }

        const answer = await Answer.create({
            questionId: Number(questionId),
            userId: req.user.id,
            content
        });

       await Question.update(
    { comments: (question.comments || 0) + 1 },
    { where: { id: questionId } }
);

        const answerWithUser = await Answer.findOne({
            where: { id: answer.id },
            include: [{ model: User, attributes: ['username'] }]
        });

        res.status(201).json({ message: 'Answer created', answer: answerWithUser });
    } catch (error) {
        console.error('Error submitting answer:', error.message);
        res.status(500).json({ error: 'Failed to submit answer', details: error.message });
    }
};

const getAnswers= async (req, res) => {
    try {
        const { questionId } = req.query;
        if (!questionId) {
            return res.status(400).json({ error: 'Question ID is required' });
        }
        
        const answers = await Answer.findAll({
            where: { questionId: Number(questionId) ,isActive:true},
            include: [{ model: User, attributes: ['username','id'] }],
            order: [['createdAt', 'ASC']]
        });

        res.json(answers);
    } catch (error) {
        console.error('Error fetching answers:', error.message);
        res.status(500).json({ message: 'Error fetching answers', error: error.message });
    }
};



const getUserAnswers=async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(`Fetching answers for userId: ${userId}`);

        const answers = await Answer.findAll({
            where: { userId },
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Question, attributes: ['id', 'title'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        console.log(`Fetched ${answers.length} answers for userId: ${userId}`);
        if (answers.length === 0) {
            console.log('No answers found for this user.');
        }

        res.status(200).json(answers);
    } catch (error) {
        console.error('Error fetching answers:', error.message);
        res.status(500).json({ message: 'Error fetching answers', error: error.message });
    }
};


const updateAnswerToggle=async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const answerId = req.params.id;

    if (!answerId || isNaN(answerId) || parseInt(answerId) <= 0) {
      return res.status(400).json({ message: 'Invalid question ID format' });
    }
    const parsedId = parseInt(answerId);
    const answer = await Answer.findByPk(parsedId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    answer.isActive = !answer.isActive;
    await answer.save();
    res.json({ isActive: answer.isActive });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const markCorrect=async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
        const answerId = req.params.id;
        const answer = await Answer.findByPk(answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        answer.isCorrect = !answer.isCorrect;
        await answer.save();
        res.json({ id: answer.id, isCorrect: answer.isCorrect });
    } catch (error) {
        console.error('Error marking answer as correct:', error);
        res.status(500).json({ message: 'Error marking answer as correct' });
    }
};

module.exports={
  createAnswer,getAnswers,getUserAnswers,updateAnswerToggle,markCorrect
  
}
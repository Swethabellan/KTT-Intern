const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');
const authenticateToken = require('../middleware/auth');

router.post('/questions', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User authentication failed' });
    }

    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const question = await Question.create({
      userId: req.user.id,
      title,
      description,
      status: false
    });
    res.status(201).json({ message: 'Question created', question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/questions', authenticateToken, async (req, res) => {
  try {
    const { search } = req.query;
    const where = search
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } }
          ]
        }
      : {};

    if (req.user && req.user.id) {
      where.userId = req.user.id; // Only show questions created by the authenticated user
    }

    const questions = await Question.findAll({
      where,
      include: [{ model: User, attributes: ['username'] }]
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/questions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Answer, include: [{ model: User, attributes: ['username'] }] }
      ]
    });
    if (question) res.json(question);
    else res.status(404).json({ error: 'Question not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/questions/:id', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User authentication failed' });
    }

    const { id } = req.params;
    const { status, answeredBy } = req.body;
    const question = await Question.findOne({ where: { id } });
    if (!question) return res.status(404).json({ error: 'Question not found' });

    if (question.userId !== req.user.id) {
      return res.status(403).json({ error: 'User is not associated to Questions!' });
    }

    const updatedAnsweredBy = Array.isArray(answeredBy) ? answeredBy : question.answeredBy || [];
    const [updated] = await Question.update(
      { status, answeredBy: updatedAnsweredBy },
      { where: { id } }
    );

    if (updated) {
      const updatedQuestion = await Question.findOne({ where: { id } });
      res.json({ message: 'Question updated', question: updatedQuestion });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/answers', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User authentication failed' });
    }

    const { questionId, content } = req.body;
    if (!questionId || !content) {
      return res.status(400).json({ error: 'Question ID and content are required' });
    }
    if (!Number.isInteger(Number(questionId))) {
      return res.status(400).json({ error: 'Question ID must be a valid integer' });
    }

    const question = await Question.findOne({ where: { id: questionId } });
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const answer = await Answer.create({
      questionId: Number(questionId),
      userId: req.user.id,
      content
    });

    let answeredBy = Array.isArray(question.answeredBy) ? question.answeredBy : [];
    if (!answeredBy.includes(req.user.username)) {
      answeredBy.push(req.user.username);
      await Question.update(
        { status: true, answeredBy },
        { where: { id: questionId } }
      );
    }

    const updatedQuestion = await Question.findOne({
      where: { id: questionId },
      include: [
        { model: User, attributes: ['username'] },
        { model: Answer, include: [{ model: User, attributes: ['username'] }] }
      ]
    });

    res.status(201).json({
      message: 'Answer created',
      answer,
      question: updatedQuestion
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'Invalid question ID or user ID' });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
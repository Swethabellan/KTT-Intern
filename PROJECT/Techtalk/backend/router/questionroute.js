const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Questions = require('../models/questions');
const Answers = require('../models/answer');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied' });
  
    if (token.startsWith('Bearer ')) {
      token = token.slice(7); 
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY || 'token');
      req.user = decoded;
      next();
    } catch (err) {
      console.log('Token verification failed:', err.message); 
      return res.status(403).json({ error: 'Invalid token' });
    }
    
  };
// Create Question
router.post('/questions', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    console.log(req.body.userId);
    const question =  await Questions.create({
       userId: req.body.userId,
      title,
      description,
      status:true
      
    });
    res.status(201).json({ message: 'Question created', question });
  } catch (error) {d
    res.status(500).json({ error: error.message });
  }
});

// Get All Questions (with search)
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
    const questions = await Questions.findAll({
      where,
      include: [{ model: User, attributes: ['username'] }]
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Question by ID (for viewing details)
router.get('/questions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Questions.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Answers, include: [{ model: User, attributes: ['username'] }] }
      ]
    });
    if (question) res.json(question);
    else res.status(404).json({ error: 'Question not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Question (e.g., mark as answered, add answerer)
router.put('/questions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, answeredBy } = req.body;
    const question = await Questions.findOne({ where: { id } });
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const updatedAnsweredBy = Array.isArray(answeredBy) ? answeredBy : question.answeredBy || [];

    const [updated] = await Questions.update(
      { status, answeredBy: updatedAnsweredBy },
      { where: { id } }
    );
    if (updated) {
      const updatedQuestion = await Questions.findOne({ where: { id } });
      res.json({ message: 'Question updated', question: updatedQuestion });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Answer
router.post('/answers', authenticateToken, async (req, res) => {
  try {
    console.log(req.query.userId);
    const { questionId, content } = req.body;
    if (!questionId || !content) {
      return res.status(400).json({ error: 'Question ID and content are required' });
    }
    
    if (!req.user || !req.body.userId) {
        return res.status(401).json({ error: 'User authentication failed' });
      }

    const answer = await Answers.create({
      questionId,
      userId: req.User.id,
      content
    });

    const question = await Questions.findOne({ where: { id: questionId } });
    if (!question) return res.status(404).json({ error: 'Question not found' });
   
    res.status(201).json({ message: 'Answer created', answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
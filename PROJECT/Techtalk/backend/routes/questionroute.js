const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {Question} = require('../models');
const {Answer} = require('../models');
const {User} = require('../models');
const authenticateToken = require('../middleware/auth');

router.get('/questions', authenticateToken, async (req, res) => {
  try {
      const questions = await Question.findAll({
          include: [
              { model: User, attributes: ['username'] },
              { model: Answer, include: [{ model: User, attributes: ['username'] }] }
          ]
      });
      console.log('Fetched questions:', JSON.stringify(questions, null, 2));
      res.json(questions);
  } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
});

router.get('/total-questions', authenticateToken, async (req, res) => {
    try {
        const totalQuestions = await Question.count();
        res.json({ totalQuestions });
    } catch (error) {
        console.error('Error fetching total questions:', error);
        res.status(500).json({ message: 'Error fetching total questions' });
    }
});

router.get('/answered-questions', authenticateToken, async (req, res) => {
  try {
      const answeredQuestions = await Question.count({
          where: {
              comments: { [Op.gt]: 0 }
          }
      });
      console.log('Answered questions:', answeredQuestions);
      res.json({ answeredQuestions });
  } catch (error) {
      console.error('Error fetching answered questions:', error);
      res.status(500).json({ message: 'Error fetching answered questions' });
  }
});

router.get('/unanswered-questions', authenticateToken, async (req, res) => {
  try {
      const unansweredQuestions = await Question.count({
          where: {
              comments: { [Op.eq]: 0 }
          }
      });
      console.log('Unanswered questions:', unansweredQuestions);
      res.json({ unansweredQuestions });
  } catch (error) {
      console.error('Error fetching unanswered questions:', error);
      res.status(500).json({ message: 'Error fetching unanswered questions' });
  }
});


router.post('/questions', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User authentication failed' });
    }

    const {  description } = req.body;
    if ( !description) {
      return res.status(400).json({ error: 'Description are required' });
    }

    const question = await Question.create({
      userId: req.user.id,
      description
    });
    const newquestion=result.rows[0];
    res.status(201).json({ message: 'Question created', question :newquestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







// router.get('/questions', authenticateToken, async (req, res) => {
//   try {
//     const { search } = req.query;
//     const where = search
//       ? {
//           [Op.or]: [
//             { title: { [Op.iLike]: `%${search}%` } },
//             { description: { [Op.iLike]: `%${search}%` } }
//           ]
//         }
//       : {};

//     if (req.user && req.user.id) {
//       where.userId = req.user.id; 
//     }

//     const questions = await Question.findAll({
//       where,
//       include: [{ model: User, attributes: ['username'] }]
//     });
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// router.get('/api/questions', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM questions ORDER BY created_at DESC');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/questions/:id', authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const question = await Question.findOne({
//       where: { id },
//       include: [
//         { model: User, attributes: ['username'] },
//         { model: Answer, include: [{ model: User, attributes: ['username'] }] }
//       ]
//     });
//     if (question) res.json(question);
//     else res.status(404).json({ error: 'Question not found' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put('/questions/:id', authenticateToken, async (req, res) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: 'User authentication failed' });
//     }

//     const { id } = req.params;
//     const { status, answeredBy } = req.body;
//     const question = await Question.findOne({ where: { id } });
//     if (!question) return res.status(404).json({ error: 'Question not found' });

//     if (question.userId !== req.user.id) {
//       return res.status(403).json({ error: 'User is not associated to Questions!' });
//     }

//     const updatedAnsweredBy = Array.isArray(answeredBy) ? answeredBy : question.answeredBy || [];
//     const [updated] = await Question.update(
//       { status, answeredBy: updatedAnsweredBy },
//       { where: { id } }
//     );

//     if (updated) {
//       const updatedQuestion = await Question.findOne({ where: { id } });
//       res.json({ message: 'Question updated', question: updatedQuestion });
//     } else {
//       res.status(404).json({ error: 'Question not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/answers', authenticateToken, async (req, res) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: 'User authentication failed' });
//     }

//     const { questionId, content } = req.body;
//     if (!questionId || !content) {
//       return res.status(400).json({ error: 'Question ID and content are required' });
//     }
//     if (!Number.isInteger(Number(questionId))) {
//       return res.status(400).json({ error: 'Question ID must be a valid integer' });
//     }

//     const question = await Question.findOne({ where: { id: questionId } });
//     if (!question) return res.status(404).json({ error: 'Question not found' });

//     const answer = await Answer.create({
//       questionId: Number(questionId),
//       userId: req.user.id,
//       content
//     });

//     let answeredBy = Array.isArray(question.answeredBy) ? question.answeredBy : [];
//     if (!answeredBy.includes(req.user.username)) {
//       answeredBy.push(req.user.username);
//       await Question.update(
//         { status: true, answeredBy },
//         { where: { id: questionId } }
//       );
//     }

//     const updatedQuestion = await Question.findOne({
//       where: { id: questionId },
//       include: [
//         { model: User, attributes: ['username'] },
//         { model: Answer, include: [{ model: User, attributes: ['username'] }] }
//       ]
//     });

//     res.status(201).json({
//       message: 'Answer created',
//       answer,
//       question: updatedQuestion
//     });
//   } catch (error) {
//     if (error.name === 'SequelizeForeignKeyConstraintError') {
//       return res.status(400).json({ error: 'Invalid question ID or user ID' });
//     }
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
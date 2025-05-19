const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Question, Answer, User } = require('../models');
const authenticateToken = require('../middleware/auth');
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

router.get('/', authenticateToken, async (req, res) => {
    try {
        const questions = await Question.findAll({
            include: [
                { model: User, attributes: ['username'] },
                { model: Answer, include: [{ model: User, attributes: ['username'] }] }
            ],
            order: [['createdAt', 'ASC']]
        });
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error.message);
        res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User authentication failed: No user ID found' });
        }

        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const question = await Question.create({
            userId: req.user.id,
            title,
            description,
        });
        res.status(201).json({ message: 'Question created', question });
    } catch (error) {
        console.error('Error creating question:', error.message);
        res.status(500).json({ error: 'Failed to create question', details: error.message });
    }
});
router.get('/questions', verifyAdmin,authenticateToken, async (req, res) => {
   try {
        const filter = req.query.filter || 'all';
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order || 'DESC';
        console.log('Fetching questions with filter:', filter, 'sortBy:', sortBy, 'order:', order);

        let queryOptions = {
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Answer, attributes: ['id', 'content', 'createdAt', 'userId'] }
            ],
            order: [[sortBy, order]],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Answers.id')), 'answerCount']
                ]
            },
            group: ['Question.id', 'User.id', 'Answers.id']
        };

        if (filter === 'answered') {
            queryOptions.include[1] = { model: Answer, required: true };
        } else if (filter === 'unanswered') {
            queryOptions.include[1] = { model: Answer, required: false };
            queryOptions.having = sequelize.literal('COUNT("Answers"."id") = 0');
        }

        const questions = await Question.findAll(queryOptions);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

router.get('/total-questions', authenticateToken, async (req, res) => {
    try {
        const totalQuestions = await Question.count();
        res.json({ totalQuestions });
    } catch (error) {
        console.error('Error fetching total questions:', error.message);
        res.status(500).json({ message: 'Error fetching total questions', error: error.message });
    }
});

router.get('/answered-questions', authenticateToken, async (req, res) => {
    try {
        const answeredQuestions = await Question.count({
            where: {
                comments: { [Op.gt]: 0 }
            }
        });
        res.json({ answeredQuestions });
    } catch (error) {
        console.error('Error fetching answered questions:', error.message);
        res.status(500).json({ message: 'Error fetching answered questions', error: error.message });
    }
});

router.get('/unanswered-questions', authenticateToken, async (req, res) => {
    try {
        const unansweredQuestions = await Question.count({
            where: {
                comments: { [Op.eq]: 0 }
            }
        });
        res.json({ unansweredQuestions });
    } catch (error) {
        console.error('Error fetching unanswered questions:', error.message);
        res.status(500).json({ message: 'Error fetching unanswered questions', error: error.message });
    }
});

router.get('/total-users', authenticateToken, async (req, res) => {
    try {
        const totalUsers = await User.count();
        res.json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error.message);
        res.status(500).json({ message: 'Error fetching total users', error: error.message });
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
});

router.get('/user-answers', authenticateToken, async (req, res) => {
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
});

router.get('/answers', authenticateToken, async (req, res) => {
    try {
        const { questionId } = req.query;
        if (!questionId) {
            return res.status(400).json({ error: 'Question ID is required' });
        }

        const answers = await Answer.findAll({
            where: { questionId: Number(questionId) },
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'ASC']]
        });

        res.json(answers);
    } catch (error) {
        console.error('Error fetching answers:', error.message);
        res.status(500).json({ message: 'Error fetching answers', error: error.message });
    }
});
router.delete('/answers/:id', authenticateToken, verifyAdmin, async (req, res) => {
    try {
        const answerId = parseInt(req.params.id);
        const answer = await Answer.findByPk(answerId, { include: [Question] });
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        const question = answer.Question;
        await answer.destroy();
        await Question.update(
            { comments: Math.max((question.comments || 0) - 1, 0) },
            { where: { id: question.id } }
        );
        res.json({ message: 'Answer deleted' });
    } catch (error) {
        console.error('Error deleting answer:', error);
        res.status(500).json({ message: 'Error deleting answer' });
    }
});
module.exports = router;
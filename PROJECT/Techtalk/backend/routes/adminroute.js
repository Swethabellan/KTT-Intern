const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Question, Answer, User } = require("../models");



const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};


router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
router.get('/questions', verifyAdmin, async (req, res) => {
    try {
        const questions = await Question.findAll({
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Answer, attributes: [] }
            ],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Answers.id')), 'answerCount']
                ]
            },
            group: ['Question.id', 'User.id'],
            order: [['createdAt', 'DESC']]
        });
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

router.get('/users/stats', verifyAdmin, async (req, res) => {
    try {
        const stats = await User.groupBy('role', {
            attributes: ['role', [User.sequelize.fn('COUNT', '*'), 'count']],
            group: 'role'
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});
// router.get('/questions/stats', verifyAdmin, async (req, res) => {
//     try {
//         const total = await Question.count();
//         const answered = await Question.count({
//             include: [{ model: Answer, required: true }]
//         });
//         const unanswered = total - answered;
//         res.json({ total, answered, unanswered });
//     } catch (error) {
//         console.error('Error fetching stats:', error);
//         res.status(500).json({ message: 'Error fetching stats' });
//     }
// });
router.delete('/questions/:id', verifyAdmin, async (req, res) => {
    try {
        const questionId = parseInt(req.params.id);
        const question = await Question.findByPk(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        await Answer.destroy({ where: { questionId } });
        await question.destroy();
        res.json({ message: 'Question deleted' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ message: 'Error deleting question' });
    }
});


router.delete('/users/:id', verifyAdmin, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (userId === req.user.id) return res.status(400).json({ message: 'Cannot delete own account' });
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});



router.get('/users/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'role']
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// router.get('/questions', verifyToken, verifyAdmin, async (req, res) => {
//     try {
//         const questions = await Question.findAll({
//             include: [
//                 { model: User, attributes: ['id', 'username'] },
//                 { model: Answer, attributes: [] }
//             ],
//             attributes: {
//                 include: [
//                     [sequelize.fn('COUNT', sequelize.col('Answers.id')), 'answerCount']
//                 ]
//             },
//             group: ['Question.id', 'User.id'],
//             order: [['createdAt', 'DESC']]
//         });
//         res.json(questions);
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//         res.status(500).json({ message: 'Error fetching questions' });
//     }
// });


router.get('/questions/stats', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const total = await Question.count();
        const answered = await Question.count({
            include: [{ model: Answer, required: true }]
        });
        const unanswered = total - answered;
        res.json({ total, answered, unanswered });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Error fetching stats' });
    }
});


// router.delete('/questions/:id', verifyToken, verifyAdmin, async (req, res) => {
//     try {
//         const questionId = parseInt(req.params.id);
//         const question = await Question.findByPk(questionId);
//         if (!question) return res.status(404).json({ message: 'Question not found' });
//         await Answer.destroy({ where: { questionId } });
//         await question.destroy();
//         res.json({ message: 'Question deleted' });
//     } catch (error) {
//         console.error('Error deleting question:', error);
//         res.status(500).json({ message: 'Error deleting question' });
//     }
// });

// Your existing routes (e.g., for users, questions, answers)


// Add other existing routes...





module.exports =router;

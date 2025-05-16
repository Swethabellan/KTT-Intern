const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');

const authenticateToken = require('../middleware/auth');
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username']
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
});
router.get('/:userId/stats', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const [questions] = await db.query('SELECT COUNT(*) as count FROM Questions WHERE userId = ?', [userId]);
        const [answers] = await db.query('SELECT COUNT(*) as count FROM Answers WHERE userId = ?', [userId]);
        res.json({
            questionsCount: questions[0].count,
            answersCount: answers[0].count
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:userId/skills', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const skills = await Skill.findAll({
            where: { userId },
            attributes: ['skill']
        });
        const skillList = skills.map(skill => skill.skill);
        res.json(skillList);
    } catch (error) {
        console.error('Error fetching user skills:', error);
        res.status(500).json({ message: 'Server error while fetching user skills' });
    }
});
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await db.query('SELECT id, username, bio, skills FROM users WHERE id = $1', [userId]);
    if (!user.rows[0]) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.rows[0]);
});
router.post('/signup', async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    if (!username || !email || !password || !name) {
      return res.status(400).json({ error: 'Name, username, email, password are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24d' }
    );
    res.status(200).json({ message: 'Login Successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/total-users', authenticateToken, async (req, res) => {
  try {
    const totalUsers = await User.count();
    console.log('Total users:', totalUsers);
    res.json({ totalUsers });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ message: 'Error fetching total users' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let skillsArray = [];
    if (user.skills && typeof user.skills === 'string') {
      skillsArray = user.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      bio: user.bio || '',
      skills: skillsArray
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { bio, skills } = req.body;
    const userId = req.user.id;

    if (bio && typeof bio !== 'string') {
      return res.status(400).json({ message: 'Bio must be a string' });
    }
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const skillsString = Array.isArray(skills) ? skills.join(', ') : user.skills;

    user.bio = bio !== undefined ? bio : user.bio;
    user.skills = skillsString;

    await user.save();

    console.log(`Profile updated for user ${userId}:`, { bio: user.bio, skills: user.skills });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/activity', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const recentQuestions = await Question.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['id', 'title', 'createdAt']
    });

    const recentAnswers = await Answer.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['id', 'content', 'createdAt'],
      include: [{ model: Question, attributes: ['title'] }]
    });

    const activities = [
      ...recentQuestions.map(q => ({
        type: 'question',
        description: `Asked: ${q.title}`,
        createdAt: q.createdAt
      })),
      ...recentAnswers.map(a => ({
        type: 'answer',
        description: `Answered on: ${a.Question.title}`,
        createdAt: a.createdAt
      }))
    ];

    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const recentActivities = activities.slice(0, 5);

    res.status(200).json(recentActivities);
  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
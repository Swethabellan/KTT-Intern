// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// const profile = require("../models/profile");
// router.put('/profile', authenticateToken, async (req, res) => {
//     try {
//         const { bio, skills } = req.body;
//         const userId = req.user.id; // From JWT token

//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update bio and skills
//         user.bio = bio || user.bio;
//         user.skills = skills || user.skills;
//         await user.save();

//         res.status(200).json({ message: 'Profile updated successfully' });
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
//   module.exports = router;
const express = require('express');
const router = express.Router();
// const { User, Question, Answer } = require('./models'); 
 const User = require("../models/User");
 const Question=require("../models/Question");
 const Answer=require("../models/Answer");
 const Skill=require("../models/Skill");
const authenticateToken = require("../middleware/auth"); 

// router.get('/users', authenticateToken, async (req, res) => {
//     try {
//         const users = await User.findAll({
//             attributes: ['id', 'username'] 
//         });
//         res.json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'Server error while fetching users' });
//     }
// });

// router.get('/users/:userId/stats', authenticateToken, async (req, res) => {
//     try {
//         const userId = req.params.userId;

//         const questionsCount = await Question.count({
//             where: { userId }
//         });

//         const answersCount = await Answer.count({
//             where: { userId }
//         });

//         res.json({ questionsCount, answersCount });
//     } catch (error) {
//         console.error('Error fetching user stats:', error);
//         res.status(500).json({ message: 'Server error while fetching user stats' });
//     }
// });


// router.get('/api/users/:userId/skills', authenticateToken, async (req, res) => {
//     try {
//         const userId = req.params.userId;

//         const skills = await Skill.findAll({
//             where: { userId },
//             attributes: ['skill']
//         });

//         const skillList = skills.map(skill => skill.skill);
//         res.json(skillList);
//     } catch (error) {
//         console.error('Error fetching user skills:', error);
//         res.status(500).json({ message: 'Server error while fetching user skills' });
//     }
// });


router.get('/users', authenticateToken, async (req, res) => {
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
router.get('/users/:userId/stats', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const questionsCount = await Question.count({ where: { userId } });
        const answersCount = await Answer.count({ where: { userId } });
        res.json({ questionsCount, answersCount });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ message: 'Server error while fetching user stats' });
    }
});

router.get('/users/:userId/skills', authenticateToken, async (req, res) => {
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
module.exports = router;
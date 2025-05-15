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
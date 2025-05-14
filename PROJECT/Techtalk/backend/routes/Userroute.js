const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const{ User} = require('../models');
const Profile= require('../models/profile');
const authenticateToken = require('../middleware/auth');

router.post('/signup', async (req, res) => {
  try {
    const {name, username, email, password, role } = req.body;
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
    res.status(201).json({ message: 'User created',user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:'Error creating user' });
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
      process.env.JWT_SECRET ,
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


// router.get('/profile', authenticateToken, async (req, res) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: 'User authentication failed' });
//     }

//     let profile = await Profile.findOne({
//       where: { userId: req.user.id },
//       include: [{ model: User, attributes: ['username', 'email', 'name', 'role', 'bio', 'skills'] }]
//     });

//     if (!profile) {
//       profile = await Profile.create({
//         userId: req.user.id,
//         profilePicture: '',
//         location: '',
//         website: '',
//         github: '',
//         linkedin: ''
//       });
//       profile = await Profile.findOne({
//         where: { userId: req.user.id },
//         include: [{ model: User, attributes: ['username', 'email', 'name', 'role', 'bio', 'skills'] }]
//       });
//     }

//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put('/profile', authenticateToken, async (req, res) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: 'User authentication failed' });
//     }

//     const { profilePicture, location, website, github, linkedin, bio, skills } = req.body;
//     let profile = await Profile.findOne({ where: { userId: req.user.id } });

//     if (!profile) {
//       profile = await Profile.create({
//         userId: req.user.id,
//         profilePicture: '',
//         location: '',
//         website: '',
//         github: '',
//         linkedin: ''
//       });
//     }

//     await profile.update({
//       profilePicture: profilePicture || profile.profilePicture,
//       location: location || profile.location,
//       website: website || profile.website,
//       github: github || profile.github,
//       linkedin: linkedin || profile.linkedin
//     });

//     const user = await User.findOne({ where: { id: req.user.id } });
//     await user.update({
//       bio: bio || user.bio,
//       skills: skills || user.skills
//     });

//     const updatedProfile = await Profile.findOne({
//       where: { userId: req.user.id },
//       include: [{ model: User, attributes: ['username', 'email', 'name', 'role', 'bio', 'skills'] }]
//     });

//     res.json({ message: 'Profile updated', profile: updatedProfile });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/users', (req, res) => {
//   res.send('Users endpoint');
// });

module.exports = router;










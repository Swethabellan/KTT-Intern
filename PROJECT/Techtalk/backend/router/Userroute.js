const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Sequelize, Op } = require('sequelize');
const Userdetails = require("../models/user");
const Profile = require('../models/profile')

// const app=express()
// app.use(express.json())
// Signup
router.post('/signup', async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const { username, email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await Userdetails.findOne({ where: { [Op.or]: [{ username }, { email }] } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    const newuser = await Userdetails.create({
      username,
      email,
      password: hashedPassword,
      name: name || username,
      role: role || 'user',
      bio: '',
      skills: ''
    });
    await Profile.create({
      userId: user.id,
      profilePicture: '',
      location: '',
      website: '',
      github: '',
      linkedin: ''
    });

    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Changed from email to username
  try {
    const User = await Userdetails.findOne({ where: { username } });

    if (!User) {
      res.status(404).json({ error: 'User not found' });
    }

    const isMatched = await bcrypt.compare(password, User.password);
    if (!isMatched) {
      res.status(404).json({ error: 'Invalid password' });
    }
    const token =jwt.sign({userId:username.id},'token',{expiresIn:"24h"});
    return res.status(202).json({ message: 'Login Successful' ,token});
  } catch (error) {
    res.status(500).json({ error: 'Error in login' });
  }
});

// Get Profile
router.get('/profile',  async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: ['username', 'email', 'name', 'role', 'bio', 'skills'] }]
    });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Profile
router.put('/profile', async (req, res) => {
  try {
    const { profilePicture, location, website, github, linkedin } = req.body;
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    await profile.update({
      profilePicture: profilePicture || profile.profilePicture,
      location: location || profile.location,
      website: website || profile.website,
      github: github || profile.github,
      linkedin: linkedin || profile.linkedin
    });

    res.json({ message: 'Profile updated', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
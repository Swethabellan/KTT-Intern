const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const profile = require("../models/profile");
app.put('/profile', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { bio, skills } = req.body;
      const [updated] = await User.update({ bio, skills }, { where: { id: userId } });
      if (updated) {
        const updatedUser = await User.findOne({ where: { id: userId } });
        res.json({ message: 'Profile updated', user: updatedUser });
      } else {
      res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;
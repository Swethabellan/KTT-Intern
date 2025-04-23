const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Userdetails = require("../models/user");
const app=express()
app.use(express.json())
app.post('/signup', async (req, res) => {
    try {
      const { username, email, password, name, role, team } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await user.create({
        username,
        email,
        password: hashedPassword,
        name,
        role,
        team,
        bio,
        skills
      });
      res.status(201).json({ message: 'User created', userId: user.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

 
router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Userdetails.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            res.status(404).json({ error: "Invalid password" });
        }

        return res.status(202).json({ message: "Login Successful" })
    } catch (error) {
        res.status(500).json({ error: "Error in login" });
    }
})

module.exports = router;
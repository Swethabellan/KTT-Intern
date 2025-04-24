const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const userRoutes=require('./router/Userroute')
const questionRoutes=require('./router/questionroute');
 
const User =require('./models/user')
const Questions=require('./models/questions');
const Answers=require('./models/answer');
const Profile = require('./models/profile');

const sequelize = require('./config/database');
const app=express()
const PORT = 3000;

User.hasMany(Questions, { foreignKey: 'userId' });
Questions.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Answers, { foreignKey: 'userId' });
Questions.hasMany(Answers, { foreignKey: 'questionId' });
Answers.belongsTo(Questions, { foreignKey: 'questionId' });

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });
sequelize.sync();

app.use(express.json()); 
app.use(cors());

app.use('/api', userRoutes);
app.use('/api',questionRoutes);


app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})

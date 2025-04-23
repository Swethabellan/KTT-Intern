const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const userRoutes=require('./router/Userroute')

const sequelize = require('./config/database');
const app=express()
const PORT = 3000;

sequelize.sync();

app.use('/api', userRoutes);
// app.use('/api',questionroute);

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})

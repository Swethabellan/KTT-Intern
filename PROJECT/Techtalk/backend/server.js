const express = require('express');
const sequelize = require('./config/database');
const userRoute = require('./routes/Userroute'); 
const questionRoute = require('./routes/questionroute'); 

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use('/api', userRoute);
app.use('/api', questionRoute);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
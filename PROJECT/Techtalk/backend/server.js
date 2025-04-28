const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoute = require('./routes/Userroute');
const questionRoute = require('./routes/questionroute');

const app = express();

// app.use(cors({
//   origin: '*', // Add frontend port
//   methods: ['GET', 'POST', 'PUT'],
//   credentials: true
// }));

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.use(express.static('public'));
app.use(express.json());
app.use('/api', userRoute);
app.use('/api', questionRoute);

const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
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
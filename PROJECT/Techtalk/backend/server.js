const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/Userroute');
const questionRoute = require('./routes/questionroute');

const db = require('./models'); // <- use the initialized Sequelize with models
const sequelize = db.sequelize;

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/questions', questionRoute);

const PORT = process.env.PORT || 3000;
//db connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    sequelize.sync();
  })
  .then(() => {
    console.log('Tables synced!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/Userroute');
const questionRoute = require('./routes/questionroute');
// const adminRoute=require('./routes/adminroute');
const answerRoute=require('./routes/answerroute');
const db = require('./models'); 
const sequelize = db.sequelize;
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/questions', questionRoute);
app.use('/api/answers',answerRoute);

const { User, Question, Answer } = db;
User.associate(db);
Question.associate(db);
Answer.associate(db);


const PORT = process.env.PORT || 3000;


sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return sequelize.sync({alter:true});
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
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./router/Userroute");
const app = express();
app.use(express.json());

const PORT = 3000;

sequelize.sync();

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})
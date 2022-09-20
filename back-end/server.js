const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { errorHandler, notFound } = require('./src/middleware/error.middleware');
const db = require('./src/models');// import employee routes
const userRoutes = require('./src/routes/user.route');
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.use(cors());

app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) =>{
    res.send('Hello World yoho');
});

// error handler
app.use(notFound);
app.use(errorHandler);

//setup the server port
const port = process.env.PORT || 5000;
app.listen(port, async () =>{
    console.log(`Server is linstening in port ${port}`);

    try {
        await db.sequelize.sync({force: true}); //This creates the table, dropping them first if they already existed
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
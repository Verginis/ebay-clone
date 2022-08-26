const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { errorHandler, notFound } = require('./src/middleware/error.middleware'); 
// import employee routes
const userRoutes = require('./src/routes/user.route');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

//setup the server port
const port = process.env.PORT || 5000;

app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) =>{
    res.send('Hello World hahaha');
});

// error handler
app.use(notFound);
app.use(errorHandler);


app.listen(port, () =>{
    console.log(`Server is linstening in port ${port}`);
});
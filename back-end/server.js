const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
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


app.get('/', (req, res) =>{
    res.send('Hello World hahaha');
});


app.use('/api/v1/user', userRoutes);

app.listen(port, () =>{
    console.log(`Server is linstening in port ${port}`);
});
const express = require('express');

const app = express();

//setup the server port
const port = process.env.PORT || 5000;



app.get('/', (req, res) =>{
    res.send('Hello World hahaha');
});


const userRoutes = require('./src/routes/user.route');

app.use('/api/v1/user', userRoutes);

app.listen(port, () =>{
    console.log(`Server is linstening in port ${port}`);
});
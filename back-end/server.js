const express = require('express');
const app = express();


app.get('/', (req, res) =>{
    res.send('Hello World hahaha');
});

app.listen(5000, () => console.log('linstening in port 5000'));
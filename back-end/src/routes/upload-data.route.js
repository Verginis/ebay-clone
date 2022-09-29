const express = require('express');
const router = express.Router();
fs = require('fs');
var parser = require('xml2js');



// const { auth } = require('../middleware/token.validation');
// const role  = require('../utils/roles.utils');
// const userController = require('../controllers/user.controller');


router.post('/',(req, res, next) => {
    fs.readFile( 'items-0.xml', function(err, data) {
        var json = JSON.stringify(data)
        console.log("to json ->", json);

        req.setEncoding(json)
     });
}); 

module.exports = router;
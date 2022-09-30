const express = require('express');
const router = express.Router();
fs = require('fs');
// let xmlParser = require('xml2json');
// var parser = require('fast-xml-parser');
const {XMLParser} = require('fast-xml-parser');


// const { auth } = require('../middleware/token.validation');
// const role  = require('../utils/roles.utils');
// const userController = require('../controllers/user.controller');


router.get('/',(req, res, next) => {
    fs.readFile( '../items-1.xml', 'utf8', function(err, data) {
        // convert XML to JSON
        if (err) throw err;

        const parser = new XMLParser();
        
        var jsonData = parser.parse(data,null, true);

        var x = jsonData['Items']['Item']

        for (const obj of x) {
            console.log(obj.Name);
          }

        res.status(200).json(jsonData);
                   
     });
}); 

module.exports = router;


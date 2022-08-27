const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  auth: (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
      // Remove Bearer from string
      const bearer = bearerHeader.split(' ');

      const token = bearer[1];

      // req.token = token;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
          res.sendStatus(403);
        } else {
          req.token = token;
          res.status(200);

          console.log(decoded);
          
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  }
};
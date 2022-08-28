const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require('../models/user.model');
dotenv.config();

module.exports = {
  auth: (...roles) => {
    return async function(req, res, next)  {
      try {
        const bearerHeader = req.headers['authorization']

        if (typeof bearerHeader !== 'undefined') {
          // Remove Bearer from string
          const bearer = bearerHeader.split(' ');

          const token = bearer[1];

          // req.token = token;
          jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            console.log(decoded)
            
            if (err) {
              res.sendStatus(403);
              throw new Error('Invalid token');
            } 
              const authorizedUser = await User.findOne({where: { id : decoded.id }});
              if(!authorizedUser){
                res.sendStatus(401);
                throw new Error('Authentication failed');
              }      
              
              // if user is not the current user and if the user doesn't have the permissions needed
              if((req.params.id !== authorizedUser.id) && roles.length && !roles.includes(authorizedUser.role)) {
                res.sendStatus(401);
                throw new Error('Unauthorized user');
              }
              
              req.userData = authorizedUser;
              next();
            
          });
        } else {
          res.sendStatus(403);
        }

      } catch(e) {
        console.log(e);
        e.status = 401;
        next(e);
      }
    }
  }
};
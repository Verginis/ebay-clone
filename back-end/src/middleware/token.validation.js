const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const db = require('../models');

const User = db.user;
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
            // console.log(decoded)
            
            if (err) {
              res.sendStatus(403);
              throw new Error('Invalid token');
            } 

              console.log(req.params.id);
              console.log(decoded.id)
             
              const authorizedUser = await User.findOne({where: { id : decoded.id }});
              console.log(authorizedUser)
              if(!authorizedUser){
                res.sendStatus(401);
                throw new Error('Authentication failed');
              }      

              const ownerAuthorized = req.params.id == authorizedUser.id;
              console.log(!ownerAuthorized)
              console.log(roles)
              console.log(!roles.includes(authorizedUser.role))
              
              // if user is not the current user and if the user doesn't have the permissions needed
              if(!ownerAuthorized  && !roles.includes(authorizedUser.role)) {
                console.log("Not authorized user");
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
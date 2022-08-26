
// const UserModel = require('../models/user.model');
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
// const { sign } = require("jsonwebtoken");
const bodyParser = require('body-parser');
const {getUsers, getUserById} = require('../service/user.service');


// get all employee list
module.exports = {
    getUserList : (req, res)=> {
    //console.log('here all employees list');
        getUsers((err, users) => {
            if(err) {
                console.log(err);
                return ;
            }
            return res.json({
                success: 1,
                data: users
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record not Found"
            });
          }
          results.password = undefined;
          return res.json({
            success: 1,
            data: results
          });
        });
      }
}



// const UserModel = require('../models/user.model');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const asyncHandler =  require('express-async-handler');
const bodyParser = require('body-parser');
const {getUsers, getUserById, createUser} = require('../service/user.service');

class UserController {
  
  //get all users
  getAllUsers = asyncHandler( async(req,res, next) => {
    let userList = await getUsers();
    console.log(userList);
    if(!userList.length) {
      res.status(401);
      throw new Error("Users not found");
    }

    res.status(200).json({userList});
  });

  getUserById = asyncHandler( async(req,res, next) => {
    const user = await getUserById(req.params.id);
    if(!user) {
      res.status(401);
      throw new Error("User not found");
    }

    res.status(200)
      .send(user);
  });

  // create new user
  createNewUser = asyncHandler( async(req,res, next) => {
    const {firstname,lastname,email,password,phoneNumber,country,afm} = req.body;
    console.log(req.body)
    req.body.password = hashSync(req.body.password, genSaltSync(10));
    const user = await createUser(req.body);
      if(!user) {
        console.log(user);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      console.log(user);
      return res.status(201).json({
        message: "User was created"
      });
  })
};

module.exports = new UserController;

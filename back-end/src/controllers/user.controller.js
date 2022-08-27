const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler =  require('express-async-handler');
const bodyParser = require('body-parser');
const User = require('../models/user.model');

class UserController {

  hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  }
  
  // get users
  getAllUsers = asyncHandler( async(req,res, next) => {
    console.log('mpike')
    let userList = await User.findAll();
    console.log(userList);
    if(!userList.length) {
      res.status(401);
      throw new Error("Users not found");
    }

    res.status(200).json({userList});
  });

  getUserById = asyncHandler( async(req,res, next) => {
    const user = await User.findOne({
      where : {
        id: req.params.id
      }
    });

    if(!user) {
      res.status(401);
      throw new Error("User not found");
    }

    res.status(200)
      .send(user);
  });

  // create new user
  createUser = asyncHandler( async(req,res,next) => {
    const { firstname, lastname, email, password, phoneNumber, country, afm} = req.body
    await this.hashPassword(req);
    const emailExists = await User.findOne({
      where : {
        email: email
      }
    });
    if(emailExists) {
      res.status(400);
      throw new Error("Email already exists");
    }

    const passwordExists = await User.findOne({
      where : {
        password: password
      }
    });
    if(passwordExists) {
      res.status(400);
      throw new Error("Password already exists");
    }
    const user = await User.create(req.body);

    if(user) {
      console.log(user);
      res.json({
        message : "User created",
        data: user
      })
        .status(200);
    } else {
      res.status(400);
      throw new Error("Cannot create new User")
    }
    
  });

  userLogin = asyncHandler( async(req,res,next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email:email
      }
    });

    if(!user) {
      res.status(401);
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
      res.status(401);
      throw new Error("Incorrect password");
    }

    const token = jwt.sign({id : user.id.toString()}, process.env.JWT_SECRET, { expiresIn: '24h'});
    res.status(200)
        .json({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            country: user.country,
            afm: user.afm,
            token: token,
            createdAt: user.createdAt
        });
  });

  deleteUser = asyncHandler( async(req,res,next) => {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deletedUser) {
      res.status(404);
      throw new Error("User not found");
    }
    res.send('User has been deleted');
  });

  updateUser = asyncHandler( async(req,res,next) => {
    await this.hashPassword(req);

    const {confirm_password, ...restUpdate } = req.body;

    console.log(req.params.id);
    console.log(restUpdate);

    const result = await User.update(restUpdate, { where: { id: req.params.id } } );

    if(!result) {
      res.status(404);
      throw new Error("Something went wrong");
    }
    const updatedUser = await User.findOne( { where : {id: req.params.id} } );
    if(!updatedUser) {
      res.status(402);
      throw new Error("User not found");
    }

    res.status(200).send(updatedUser);
  });


};

module.exports = new UserController;

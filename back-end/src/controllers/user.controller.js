const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler =  require('express-async-handler');
const db = require('../models');
const User = db.user;
var builder = require('xmlbuilder');

class UserController {

  hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  }

  jsonToXml = async(itemsArray, bidsArray) => {

    let xmlObject;
    console.log(itemsArray)
    var root = builder.create('Items', { encoding: 'utf-8' })
    for (let i = 0; i < itemsArray.length; i++) {

      var item = root.ele('Item'); item.att('ItemID', itemsArray[i]['id']);
      item.ele('Name', itemsArray[i]['name']).up();
      const dataObj = JSON.parse(itemsArray[i]['category']);
      dataObj.forEach( (data) => item.ele('Category', data).up())
      
      item.ele('Currently', itemsArray[i]['current_bid']).up()
          .ele('First_Bid', itemsArray[i]['first_bid']).up()
          .ele('Number_of_Bids', itemsArray[i]['nof_bids']).up()
      if(itemsArray[i]['buy_price'] !== null) {
        item.ele('Buy_Price', itemsArray[i]['buy_price']).up()
      }
      if(itemsArray[i]['nof_bids'] === 0) {
        item.ele('Bids').up()
      } else {
        item.ele('Bids')
        for(let j = 0; j < bidsArray.length; j++) {
          item.ele('Bid')
                .ele('Bidder', {'Rating' : 100 , 'UserID' : bidsArray[j]['username']})
                  .ele('Location', 'USA').up()
                  .ele('Country', 'Greece').up()
                .up()
                .ele('Time', bidsArray[j]['createdAt']).up()
                .ele('Amount', bidsArray[j]['amount']).up()
              .up()
          }
          item.up() 
      }     
      if( itemsArray[i]['latitude'] !== null && itemsArray[i]['longitude'] !== null ) {
          item.ele('Location', {'Latitude' : itemsArray[i]['latitude'], 'Longitude': itemsArray[i]['longitude']}).up();
      } else {
        item.ele('Location', itemsArray[i]['location']).up();
      }
      item.ele('Country', itemsArray[i]['country']).up()
          .ele('Started', itemsArray[i]['createdAt']).up()
          .ele('Ends', itemsArray[i]['ended']).up()
          .ele('Description', itemsArray[i]['description']).up()    
      item.up();
    }
      // console.log(root.end({ pretty: true }));
    return root.end({ pretty: true });
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

    res.status(200).json(userList);
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
    const { username,firstname, lastname, email, password, phoneNumber, country, afm} = req.body
    await this.hashPassword(req);
    console.log(typeof User)
    const usernameExists = await User.findOne({
      where : {
        username: username
      }
    });
    if(usernameExists) {
      res.status(400);
      throw new Error("Username already exists");
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
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username
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
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            country: user.country,
            afm: user.afm,
            token: token,
            role: user.role,
            createdAt: user.createdAt
        });
  });

  grantUserAccess = asyncHandler( async(req,res,next) => {
    if(req.params.id == undefined) {
      res.status(500);
      throw new Error("Something wrong with parameters")
    }

    let user = await User.findOne({
      where:{
        id: req.params.id
      }
    });

    if(!user) {
      res.status(404);
      throw new Error("Something went wrong");
    }

    user.set({
      access: "D"
    });

    user = await user.save();
    if(!user) {
      res.status(404);
      throw new Error("Something went wrong");
    }
    console.log(user);

    res.status(200).send(user);
  });

  denyUserAccess = asyncHandler( async(req,res,next) => {
    if(req.params.id == undefined) {
      res.status(500);
      throw new Error("Something wrong with parameters")
    }

    let user = await User.findOne({
      where:{
        id: req.params.id
      }
    });

    if(!user) {
      res.status(404);
      throw new Error("Something went wrong");
    }

    user.set({
      access: "GRANTED"
    });

    user = await user.save();
    if(!user) {
      res.status(404);
      throw new Error("Something went wrong");
    }
    console.log(user);

    res.status(200).send(user);
  });


  deleteUser = asyncHandler( async(req,res,next) => {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deletedUser) {
      res.status(404);
      throw new Error("User deletion failed");
    }
    res.status(204).send('User has been deleted');
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

  downloadJson = asyncHandler( async(req,res,next) => { 
    
    const itemList  = await db.sequelize.query('SELECT items.*, users.username FROM items,users WHERE items.sellerId = users.id', 
    { type: db.sequelize.QueryTypes.SELECT }
    );

    if(!itemList) {
      res.status(500);
      throw new Error("No items found");
    } 

    res.status(200).json(itemList);
  });

  downloadXML = asyncHandler( async(req,res,next) => { 
    
    const itemList  = await db.sequelize.query('SELECT items.*, users.username FROM items,users WHERE items.sellerId = users.id', 
    { type: db.sequelize.QueryTypes.SELECT }
    );

    const bidList  = await db.sequelize.query('SELECT bidds.*, users.username, users.country FROM items,users, bidds WHERE bidds.itemId = items.id and bidds.bidderId = users.id', 
    { type: db.sequelize.QueryTypes.SELECT }
    );

    if(!bidList) {
      res.status(500);
      throw new Error("Bid not found");
    }

    const xml = await this.jsonToXml(itemList, bidList);
    console.log(xml);

    res.status(200).send(xml);
  });

};

module.exports = new UserController;

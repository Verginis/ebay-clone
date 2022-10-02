const express = require('express');
const router = express.Router();
const asyncHandler =  require('express-async-handler');
const bcrypt = require("bcrypt");
const fs = require('fs');
// let xmlParser = require('xml2json');
// var parser = require('fast-xml-parser');
const {XMLParser} = require('fast-xml-parser');
const db = require('../models');

const User = db.user;
const Item = db.item;
const Category = db.category;
const Bid = db.bid;
// const { auth } = require('../middleware/token.validation');
// const role  = require('../utils/roles.utils');
// const userController = require('../controllers/user.controller');


router.get('/',(req, res, next) => {
    fs.readFile( '../items-1.xml', 'utf8', async (err, data) =>  {
        // convert XML to JSON
        if (err) throw err;

        var options = {
          attrNodeName: "attr",
          attributeNamePrefix : "",
          ignoreAttributes : false,
          parseNodeValue : true,
          parseAttributeValue : true,
          textNodeName : "text"
        }

        const parser = new XMLParser(options);
        
        var jsonData = parser.parse(data,null, true);
        let item = jsonData['Items']['Item'];
        
        var count_items = 1;
        var count_bids = 1;

        for (const obj of item) {
         
          let itemId = obj.ItemID
          console.log('INSERTING ITEM ID ' + itemId)
          let name = obj.Name;
          let category = obj.Category;
          let current_bid = obj.Currently;
          let first_bid = obj.First_Bid;
          let nof_bids = obj.Number_of_Bids;
          if(obj.Buy_Price == undefined) 
            obj.Buy_Price = null;
          let buy_price = obj.Buy_Price;
          // let Bids = parser.parse(data, null , true);
          var location;
          if(obj.Location.Latitude == undefined) 
            obj.Location.Latitude = null;
          if(obj.Location.Longitude == undefined) 
            obj.Location.Longitude = null;
          if(obj.Location.text == undefined)
            location = obj.Location
          else 
            location = obj.Location.text
          
          let country = obj.Country;
          let started = obj.Started;
          let ends = obj.Ends;
          // let Seller = parser.parse(data, null , true);
          let description = obj.Description;

          // console.log(obj.Seller);
          if(obj.Seller !== undefined) {
            let seller_username = obj.Seller.UserID;
            let seller_rating = obj.Seller.Rating;
            let seller_pwd =  await bcrypt.hash(seller_username, 8);

            let [user, created_seller] = await User.upsert({
              username: seller_username,
              firstname: seller_username,
              lastname: seller_username,
              email: seller_username + '@gmail.com',
              password: seller_pwd,
              phoneNumber: 2100000000,
              country: 'Europe',
              afm: 111111,
              access: 'GRANTED'
            })

            console.log(user);
            console.log(created_seller);

            if(user) {
              console.log("User created " + user);
              // res.json({
              //   message : "User created",
              //   data: user
              // })
              //   .status(200);
            } else {
              res.status(400);
              throw new Error("Cannot create new User")
            } 
            // remove '$' if not null 
            if(buy_price !== null) {
              parseFloat(buy_price.replace(/\$/,""))
            }

            try {
              let [newItem, created_item] = await Item.upsert({
                id: itemId,
                name: name,
                category: category,
                current_bid: parseFloat(current_bid.replace(/\$/,"")),
                first_bid: parseFloat(first_bid.replace(/\$/,"")),
                nof_bids: nof_bids,
                buy_price: buy_price,
                location: location,
                latitude:  obj.Location.Latitude,
                longitude: obj.Location.Longitude,
                sellerId: user.id,
                country: country,
                ended: obj.Ends,
                description: description,
                runningAuction: true
              })

              if(newItem) {
                console.log('Item created' + newItem);
                // res.json({
                //   message : "Item created",
                //   data: newItem
                // })
                //   .status(200);
              } else {
                res.status(400);
                throw new Error("Cannot create new Item")
              }
            } catch(err) {
              console.log(err);
            }

          console.log(obj.Bids)

            if(typeof obj.Bids !== 'undefined') {
              if( typeof obj.Bids.Bid !== 'undefined' ) {
                let time;
                let amount;
                let location;
                let country ;
                let bidder_username; 
                let bidder_pwd; 
                
                console.log(obj.Bids.Bid.length)
                if(obj.Bids.Bid.length > 1) {
                  for(let x in obj.Bids.Bid) {
                    location = obj.Bids.Bid[x].Bidder.Location;
                    country = obj.Bids.Bid[x].Bidder.Country;
                    bidder_username = obj.Bids.Bid[x].Bidder.UserID;
                    bidder_pwd = await bcrypt.hash(bidder_username.toString(), 8)
                    time = obj.Bids.Bid[x].Time;
                    amount = obj.Bids.Bid[x].Amount;
                    console.log(obj.Bids.Bid[x].Bidder)
                    console.log('Time - ' + time + 'amount ' + amount);
                    console.log('trying to insert ' + bidder_username)

                    let [bidder, created_bidder] = await User.upsert({
                      username: bidder_username,
                      firstname: bidder_username,
                      lastname: bidder_username,
                      email: bidder_username + '@gmail.com',
                      password: bidder_pwd,
                      phoneNumber: 2100000000,
                      country: country,
                      afm: 111111,
                      access: 'GRANTED'
                    })
        
                    if(bidder) {
                      console.log(bidder);
                      // res.json({
                      //   message : "User created",
                      //   data: bidder
                      // })
                      //   .status(200);
                    } else {
                      res.status(400);
                      throw new Error("Cannot create new User")
                    }
    
                    console.log('Creating bid with item id: ' + itemId);
    
                    // create new Bid
                    let newBid = await Bid.create({
                      itemId: itemId,
                      bidderId: bidder.id,
                      amount: parseFloat(amount.replace(/\$/,""))
                    });
                    if(!newBid) {
                      res.status(500);
                      throw new Error('Error while creating Bid');
                    }
                  }
                } else {
                  time = obj.Bids.Bid.Time;
                  amount = obj.Bids.Bid.Amount;
                  location = obj.Bids.Bid.Bidder.Location;
                  country = obj.Bids.Bid.Bidder.Country;
                  bidder_username = obj.Bids.Bid.Bidder.UserID;
                  console.log('trying to insert ' + bidder_username)
                  bidder_pwd = await bcrypt.hash(bidder_username.toString(), 8)

                  console.log('Time - ' + time + 'amount ' + amount);

                  let [bidder, created_bidder] = await User.upsert({
                    username: bidder_username,
                    firstname: bidder_username,
                    lastname: bidder_username,
                    email: bidder_username + '@gmail.com',
                    password: bidder_pwd,
                    phoneNumber: 2100000000,
                    country: country,
                    afm: 111111,
                    access: 'GRANTED'
                  })
      
                  if(bidder) {
                    console.log(bidder);
                    // res.json({
                    //   message : "User created",
                    //   data: bidder
                    // })
                    //   .status(200);
                  } else {
                    res.status(400);
                    throw new Error("Cannot create new User")
                  }
  
                  console.log('Creating bid with item id: ' + itemId);
  
                  // create new Bid
                  let newBid = await Bid.create({
                    itemId: itemId,
                    bidderId: bidder.id,
                    amount: parseFloat(amount.replace(/\$/,""))
                  });
                  if(!newBid) {
                    res.status(500);
                    throw new Error('Error while creating Bid');
                  }
                }
                // console.log(amount)
              }
            }
          }
        }
        res.status(200).send("everything done")  
    });
});

module.exports = router;


const db = require('../models');
const asyncHandler =  require('express-async-handler');
const bodyParser = require('body-parser');
const { item } = require('../models');

const User = db.user;
const Item = db.item;
const Category = db.category;
const Bid = db.bid;

class ItemController {
    // create new user
    storeItem = asyncHandler( async(req,res,next) => {
        const userFound = await User.findOne({
            where : {
              id: req.body.sellerId
            }
          });
      
          if(!userFound) {
            res.status(404).json({
                message: "User not found"
            });
            throw new Error("User not found");
          }

          // add categories
          let categories = [];
          for(const cat in req.body.categories) {
            console.log(cat);
            categories.push(cat);
          }

          console.log(categories)
          const newItem = await Item.create({
            name: req.body.name,
            category: req.body.categories,
            current_bid: req.body.first_bid,
            first_bid: req.body.first_bid,
            nof_bids: req.body.nof_bids,
            buy_price: req.body.buy_price,
            location: req.body.location,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            sellerId: req.body.sellerId,
            country: req.body.country,
            description: req.body.description,
            runningAuction: true
            });

            if(newItem) {
                console.log(newItem);
                res.json({
                  message : "Item created",
                  data: newItem
                })
                  .status(200);
            } else {
                res.status(400);
                throw new Error("Cannot create new Item")
            }
    });

    getItems = asyncHandler( async(req,res,next) => {
      if(typeof req.params.userId == 'undefined') {
        throw new Error('Error with the sellerId');
      }

      const userId = req.params.userId;
      // check if user exists
      const userExists = await User.findOne({
        where: {
          id: userId
        }
      });

      if(!userExists) {
        throw new Error("User doesn't exist");
      }

      const userItems = await Item.findAll({
        where: {
          sellerId: userId
        }
      })

      console.log(userItems);

      res.status(200).json({
        data: userItems
      })
    });

    storeBid = asyncHandler( async(req, res, next) => {
      if(typeof req.params.itemId == 'undefined') {
        throw new Error('Error with itemId');
      }

      const itemFound = await Item.findOne({
        where: {
          id: req.params.itemId
        }
      })

      if(!itemFound) {
        res.status(400).json({
          message: 'Invalid item id given'
        });
        throw new Error('Invalid item id');
      }
      console.log(itemFound);

      // check if auction is running
      if(!itemFound.runningAuction) {
        res.status(400).json({
          message: 'Auction completed'
        });
        throw new Error("Auction is already finished");
      }

      if(req.body.amount <= itemFound.current_bid) {
        res.status(400).json({
          message: 'Low bid'
        });
        throw new Error("Bid is not enough");
      }

      const newBid = await Bid.create({
        itemId: req.params.itemId,
        bidderId: req.body.bidderId,
        amount: req.body.amount
      });
      if(!newBid) {
        res.status(500);
        throw new Error('Error while creating Bid');
      }

      console.log(newBid);
      // update Item with bid info
      let runningAuction = true;
      if(itemFound.getBuyPrice <= newBid.amount) {
        runningAuction = false;
      }
      
      const result = await itemFound.update({
        current_bid: req.body.amount,
        nof_bids: itemFound.nof_bids + 1,
        runningAuction: runningAuction
      })

      if(!result) {
        res.status(404);
        throw new Error("Ooops! Something went wrong");
      }
      res.status(201).json({
        message: 'Bid created'
      });
      
    });

    buyItem = asyncHandler( async(req, res, next) => {
      if(typeof req.params.itemId == 'undefined') {
        throw new Error('Error with itemId');
      }

      const itemFound = await Item.findOne({
        where: {
          id: req.params.itemId
        }
      });

      if(!itemFound) {
        res.status(400).json({
          message: 'Invalid item id given'
        });
        throw new Error('Invalid item id');
      }
      console.log(itemFound);

      const amount = itemFound.buy_price;
      const bidder = req.body.bidderId;

      if(!itemFound.runningAuction) {
        throw new Error('Auction completed');
      }

      const newBid = await Bid.create({
        itemId: req.params.itemId,
        bidderId: req.body.bidderId,
        amount: itemFound.amount
      });
      if(!newBid) {
        res.status(500);
        throw new Error('Error while creating Bid');
      }

      const json = JSON.stringify(new Date());
      const parsed = JSON.parse(json); //2015-10-26T07:46:36.611Z
      const date = new Date(parsed); // Back to date object
      console.log(date);

      const result = await Item.update({
        current_bid: amount,
        runningAuction: false,
        nof_bids: itemFound.nof_bids + 1,
        ended: date,
      });


      if(!result) {
        res.status(404);
        throw new Error("Ooops! Something went wrong");
      }
      
    });

    deleteItem = asyncHandler( async(req, res, next) => {
      if(typeof req.params.itemId == 'undefined') {
        throw new Error('Error with itemId');
      }
      const itemFound = await Item.findByPk({
        where: {
          id: req.params.itemId
        }
      });

      if(!itemFound) {
        res.status(400).json({
          message: 'Invalid item id given'
        });
        throw new Error('Invalid item id');
      }

      if(!itemFound.runningAuction) {
        res.status(417).json({
          message: 'Auction not running'
        });
        throw new Error('Auction not running');
      }

      if(!itemFound.nof_bids > 0) {
        res.status(417).json({
          message: 'Item cannot be deleted'
        });
        throw new Error('Ooops! There are bids here!');
      }

      const deletedItem = await Item.destroy({
        where: {
          id: req.params.itemId
        }
      });
      if(!deletedItem) {
        res.status(500);
        throw new Error("Item deletion failed");
      }
      res.status(204).json({
        message: 'Item deleted successfully'
      });

    })
};

module.exports = new ItemController;


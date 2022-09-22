const db = require('../models');
const asyncHandler =  require('express-async-handler');
const bodyParser = require('body-parser');

const User = db.user;
const Item = db.item;
const Category = db.category;

class ItemController {
    // create new user
    storeItem = asyncHandler( async(req,res,next) => {
        const userFound = await User.findOne({
            where : {
              id: req.body.seller
            }
          });
      
          if(!userFound) {
            res.status(404).json({
                message: "User not found"
            });
            throw new Error("User not found");
          }

          const categoryFound = await Category.findOne({
            where: {
              name: req.body.category
            }
          });
          if(!categoryFound) {
            res.status(404).json({
              message: "Category not found"
            });
            throw new Error("Category not found");
          }

          const item = new Item({
            name: req.body.name,
            category: req.body.category,
            current_bid: req.body.first_bid,
            first_bid: req.body.first_bid,
            nof_bids: req.body.nof_bids,
            buy_price: req.body.buy_price,
            location: req.body.location,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            seller: req.body.seller,
            country: req.body.country,
            description: req.body.description
            });

            const newItem = await Item.create(req.body);

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
};

module.exports = new ItemController;


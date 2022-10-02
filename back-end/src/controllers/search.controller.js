const db = require('../models');
const asyncHandler =  require('express-async-handler');
const bodyParser = require('body-parser');
const { item } = require('../models');
const { QueryTypes } = require('sequelize');
const Op = db.Sequelize.Op;

const User = db.user;
const Item = db.item;
const Category = db.category;
const Bid = db.bid;

class SearchController {
  // used for search
    getPagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
    
        return { limit, offset };
    };

    getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: tutorials } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
    
        return { totalItems, tutorials, totalPages, currentPage };
    };
   
    search = asyncHandler( async(req, res, next) => {
      const { page, size, category, price, location, text } = req.query;

      const { limit, offset } = this.getPagination(page, size);

      const data = await Item.findAndCountAll({
        where: { [Op.or]: 
            {
                current_bid: { [Op.between]: [+0, +price] },
                category : { [Op.substring]: category},
                location: { [Op.substring]: location },
                description: { [Op.substring]: text }
            }
        }, 
        limit,
        offset
      })

      if(!data) {
        res.status(500)
        throw new Error('Error searching by price')
      } 

      console.log(data);
      res.status(200).json(data);      
    })
};

module.exports = new SearchController;


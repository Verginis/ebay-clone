const db = require('../models');
const asyncHandler =  require('express-async-handler');
const bodyParser = require('body-parser');
const { message } = require('../models');

const User = db.user;
const Message = db.message;
const Item = db.item;
const Category = db.category;
const Bid = db.bid;

class MessageController {

    sendMessage = asyncHandler( async(req, res, next) => {
        if(typeof req.params.username == 'undefined' || req.params.text == 'undefined') {
            throw new Error('Error with parameters');
          }
          const reciever = await User.findOne({
            where: {
              username: req.params.username
            }
          });
          if(!reciever) {
            res.status(500);
            throw new Error("User doesnt exist");
          }
          // get sender
          const senderId = req.body.senderId;
          console.log(senderId)
          const sender = await User.findOne({
            where:{
                id: senderId
            }
          });
          if(!sender){
            res.status(500);
            throw new Error("User doesnt exist");
          }

          const result = await Message.create({
            senderId: senderId,
            recieverId: reciever.id,
            text: req.body.text,
            seen: false
          })

          if(!result) {
            res.status(500);
            throw new Error("Message storage failed")
          }

          res.status(200).json({result})
    })

    getRecievedMessages = asyncHandler( async(req, res, next) => {
        if(req.body.recieverId == undefined) {
            res.status(400);
            throw new Error("Error with params");
        }

        const recieverId = req.body.recieverId;
        let messages = [];

        const userFound = await User.findOne({
          where: {
            id: recieverId
          }
        })

        if(!userFound) {
          res.status(500).json({
            message: 'No user found'
          });
          throw new Error("Ooops! Something wrong");
        }

        messages = await Message.findAll({
          where: {
            recieverId: recieverId,
            recieverId: userFound.id
          }
        });

        if(!messages) {
          res.status(500).json({
            message: 'No messages'
          });
          throw new Error("Ooops! Something wrong");
        }
        res.status(200).json(messages);
        console.log(JSON.stringify(messages));
    })

    getSentMessages = asyncHandler( async(req, res, next) => {
      if(req.body.senderId == undefined) {
          res.status(400);
          throw new Error("Error with params");
      }

      const senderId = req.body.senderId;
      let messages = [];

      const userFound = await User.findOne({
        where: {
          id: senderId
        }
      })

      if(!userFound) {
        res.status(500).json({
          message: 'No user found'
        });
        throw new Error("Ooops! Something wrong");
      }

      messages = await Message.findAll({
        where: {
          senderId: senderId,
          senderId: userFound.id
        }
      });

      if(!messages) {
        res.status(500).json({
          message: 'No messages'
        });
        throw new Error("Ooops! Something wrong");
      }
      res.status(200).json(messages);
      console.log(messages);
  })

  deleteMessage = asyncHandler( async(req, res, next) => {
    if(req.params.id == undefined) {
      res.status(500);
      throw new Error("Parameters missing");
    }

    const messageId = req.params.id;
    const deletedMessage = await Message.destroy({
      where: {
        id: messageId
      }
    });
    if(!deletedMessage) {
      res.status(404);
      throw new Error("Message deletion failed");
    }
    res.status(200).send('Message has been deleted');
  });

}   


module.exports = new MessageController;
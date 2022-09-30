const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const messageController = require('../controllers/message.controller.js');


router.post("/:username/send",messageController.sendMessage);
router.get("/:recieverId/recieved", messageController.getRecievedMessages)
router.get("/:senderId/sent", messageController.getSentMessages)
router.delete("/:id/delete", messageController.deleteMessage)

module.exports = router;
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const itemController = require('../controllers/item.controller');


router.post("/",itemController.storeItem);
router.get("/:userId",itemController.getItems);
router.post("/:itemId/bid",itemController.storeBid);

module.exports = router;
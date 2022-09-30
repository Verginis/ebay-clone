const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const itemController = require('../controllers/item.controller');


router.post("/",itemController.storeItem);
router.get("/:userId",itemController.getItems);
router.get("/", itemController.getAllItems);
router.post("/:itemId/bid",itemController.storeBid);
router.post("/:itemId/buy",itemController.buyItem);
router.delete("/:itemId", itemController.deleteItem);

module.exports = router;
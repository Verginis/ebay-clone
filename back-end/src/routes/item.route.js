const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const itemController = require('../controllers/item.controller');


router.post("/",itemController.storeItem);
// router.post("/login",userController.userLogin);
// router.delete('/id/:id',auth(role.Admin),userController.deleteUser);
// router.patch('/id/:id',auth(),userController.updateUser);

module.exports = router;
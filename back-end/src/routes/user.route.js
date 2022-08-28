const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const userController = require('../controllers/user.controller');

// get all employees
router.get('/',auth(role.Admin),userController.getAllUsers); // admin 
router.get("/id/:id",auth(),userController.getUserById);
router.post("/register",userController.createUser);
router.post("/login",userController.userLogin);
router.delete('/id/:id',auth(role.Admin),userController.deleteUser);
router.patch('/id/:id',auth(),userController.updateUser);

module.exports = router;
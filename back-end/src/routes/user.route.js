const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const userController = require('../controllers/user.controller');

// get all employees
router.get('/',auth(role.Admin),userController.getAllUsers); // admin 
router.get("users/id/:id",auth(),userController.getUserById);
router.post("/register",userController.createUser);
router.post("/login",userController.userLogin);
router.delete('/id/:id',auth(role.Admin),userController.deleteUser);
router.patch('users/id/:id',auth(),userController.updateUser);
router.patch('/admin/users/:id/accecpt',auth(role.Admin), userController.grantUserAccess);

module.exports = router;
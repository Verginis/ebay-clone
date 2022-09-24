const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const userController = require('../controllers/user.controller');

// get all employees
router.get('/users',auth(role.Admin),userController.getAllUsers); // admin 
router.get("users/id/:id",auth(),userController.getUserById);
router.post("/register",userController.createUser);
router.post("/login",userController.userLogin);
router.delete('/id/:id',auth(role.Admin),userController.deleteUser);
router.patch('users/id/:id',auth(),userController.updateUser);

// grant user access
router.patch('/admin/users/:id/accept',auth(role.Admin), userController.grantUserAccess);
// deny user access
router.patch('/admin/users/:id/decline',auth(role.Admin), userController.denyUserAccess);

module.exports = router;
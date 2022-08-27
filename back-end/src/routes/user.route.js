const express = require('express');
const router = express.Router();
const { auth } = require('../../auth/token.validation');
const userController = require('../controllers/user.controller');

// get all employees
router.get('/',auth,userController.getAllUsers);
router.get("/id/:id",userController.getUserById);
router.post("/register",userController.createUser);
router.post("/login",userController.userLogin);
router.delete('/id/:id',userController.deleteUser);
router.patch('/id/:id',userController.updateUser);

module.exports = router;
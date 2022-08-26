const express = require('express');
const router = express.Router();
const { auth } = require('../../auth/token.validation');
const userController = require('../controllers/user.controller');


// const {
//     createUser,
//     login,
//     getUserById,
//     getUserList,
//     updateUsers,
//     deleteUser
//   } = require("../controllers/user.controller");

// get all employees
router.get('/',userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register",userController.createNewUser);


module.exports = router;
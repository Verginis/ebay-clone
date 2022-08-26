const express = require('express');
const router = express.Router();
const { auth } = require('../../auth/token.validation');

const {
    createUser,
    login,
    getUserById,
    getUserList,
    updateUsers,
    deleteUser
  } = require("../controllers/user.controller");

// get all employees
router.get('/', getUserList);
router.get("/:id",auth, getUserById);


module.exports = router;
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/token.validation');
const role  = require('../utils/roles.utils');
const searchController = require('../controllers/search.controller');

// search
router.get("/", searchController.search);

module.exports = router;
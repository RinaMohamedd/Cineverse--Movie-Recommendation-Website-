const express = require('express');
const router = express.Router();
const { getAdmin } = require('../controllers/adminController');
// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

// Admin page route
router.get('/', getAdmin);

module.exports = router; 
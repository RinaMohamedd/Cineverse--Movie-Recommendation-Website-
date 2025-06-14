const express = require('express');
const router = express.Router();
const { getAdmin, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Admin page route
router.get('/', getAdmin);

// User management routes
router.get('/users', getAllUsers);  // Temporarily removed auth middleware for testing
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Debug route to test if admin routes are working
router.get('/test', (req, res) => {
    res.json({ message: 'Admin routes are working' });
});

module.exports = router; 
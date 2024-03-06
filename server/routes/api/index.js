const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.js');
const taskRoutes = require('./task.js');

// All Auth Routes
router.use('/auth', authRoutes);

// All Task Routes
router.use('/task', taskRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} = require('../controllers/taskController');

const authMiddleware = require('../middlewares/authMiddleware'); // ✅ Add this line

// Routes
router.post('/', authMiddleware, createTask);         // Create task
router.get('/', authMiddleware, getTasks);            // Get all tasks
router.delete('/:id', authMiddleware, deleteTask);    // Delete task
router.put('/:id', authMiddleware, updateTask);       // Update task

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} = require('../controllers/taskController');
// ✅ Correct
const auth = require('../middlewares/authMiddleware');


// Routes
router.post('/', authMiddleware, createTask);         // Create task
router.get('/', authMiddleware, getTasks);            // Get all tasks for user
router.put('/:id', authMiddleware, updateTask);       // Update task
router.delete('/:id', authMiddleware, deleteTask);    // Delete task

module.exports = router;

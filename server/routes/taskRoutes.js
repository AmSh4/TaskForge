const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, shareTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
router.use(auth);
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/share', shareTask);

module.exports = router;

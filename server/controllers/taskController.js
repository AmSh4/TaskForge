const Task = require('../models/Task');
const User = require('../models/User');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ $or: [{ owner: req.user.id }, { sharedWith: req.user.id }] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || (task.owner.toString() !== req.user.id && !task.sharedWith.includes(req.user.id))) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.shareTask = async (req, res) => {
  try {
    const { email } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task || task.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const shareUser = await User.findOne({ email });
    if (!shareUser) return res.status(404).json({ error: 'User not found' });
    if (!task.sharedWith.includes(shareUser._id)) {
      task.sharedWith.push(shareUser._id);
      await task.save();
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
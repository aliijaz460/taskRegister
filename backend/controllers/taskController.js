const Task = require('../models/taskModel');

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

const createTask = async (req, res) => {
    const { title, category } = req.body;
    const task = await Task.create({ title, category, user: req.user.id });
    res.status(201).json(task);
};

const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task.user.toString() !== req.user.id) {
        res.status(401);
    } else {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    }
};

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task.user.toString() !== req.user.id) {
        res.status(401);
    } else {
        await task.remove();
        res.json({ message: 'Task removed' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

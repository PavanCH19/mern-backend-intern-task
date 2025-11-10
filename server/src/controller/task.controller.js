const { validationResult } = require("express-validator");
const Task = require("../models/Task");
const permit = require("../middleware/role");

// Create Task
exports.createTask = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const task = await Task.create({ ...req.body, userId: req.user.id });
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

// Get All Tasks
exports.getTasks = async (req, res, next) => {
    try {
        const tasks =
            req.user.role === "admin"
                ? await Task.find()
                : await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

// Update Task
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Not found" });

        if (req.user.role !== "admin" && task.userId.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

        await task.updateOne(req.body);
        res.json({ message: "Updated" });
    } catch (err) {
        next(err);
    }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Not found" });

        if (req.user.role !== "admin" && task.userId.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

        await task.deleteOne();
        res.json({ message: "Deleted" });
    } catch (err) {
        next(err);
    }
};

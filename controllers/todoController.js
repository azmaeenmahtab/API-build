const Todo = require("../models/todoModel");

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.getTodoById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Add a new todo
exports.addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const newTodo = await Todo.addTodo(title, description);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.deleteTodo(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const { title, description, is_completed } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const updatedTodo = await Todo.updateTodo(req.params.id, title, description, is_completed);
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

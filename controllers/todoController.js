const Todo = require("../models/todoModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();
//register
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const user = await Todo.register(name, email, password);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send("internal error occured");
    }
}

//login
const jwt = require("jsonwebtoken"); // Import JWT

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password required");
        }

        const user = await Todo.login(email, password);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ success: true, token }); // ✅ Return token
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



// Get all todos for the logged-in user
exports.getAllTodos = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming user info is in req.user
        const todos = await Todo.getAllTodosByUser(userId);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a specific todo for the logged-in user
exports.getTodoById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todo = await Todo.getTodoById(req.params.id, userId);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Add a new todo for the logged-in user
exports.addTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, completed } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const newTodo = await Todo.addTodo(userId, title, completed || false);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a todo for the logged-in user
exports.deleteTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const deletedTodo = await Todo.deleteTodo(req.params.id, userId);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found or not authorized" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a todo for the logged-in user
exports.updateTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, completed } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const updatedTodo = await Todo.updateTodo(req.params.id, userId, title, completed || false);
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found or not authorized" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//logout
exports.logout = async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expiryTime = new Date(decoded.exp * 1000); // Convert to a valid timestamp

        await Todo.logout(token, expiryTime);
        return res.status(200).json({ message: "Logged out successfully. Token is now blacklisted." });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, can't log out user" });
    }
};




const jwt = require("jsonwebtoken");
const Todo = require("../models/todoModel");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided" });
    }

    try {

        const isBlacklisted = await Todo.isBlacklisted(token);
        if (isBlacklisted) {

            return res.status(401).send("Token is invalid or expired . Please Login Again.");
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // ✅ Important! Proceed to the next middleware
    } catch (error) {
        return res.status(400).json({ success: false, error: "Invalid token" });
    }
};

module.exports = authMiddleware;

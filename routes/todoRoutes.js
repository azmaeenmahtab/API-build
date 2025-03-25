const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", todoController.register); // ❌ No auth required
router.post("/login", todoController.login);       // ❌ No auth required
router.get("/", authMiddleware, todoController.getAllTodos);
router.get("/:id", authMiddleware, todoController.getTodoById);
router.post("/", authMiddleware, todoController.addTodo);
router.delete("/:id", authMiddleware, todoController.deleteTodo);
router.put("/:id", authMiddleware, todoController.updateTodo);


module.exports = router;

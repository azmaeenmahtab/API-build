const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */


router.post("/register", todoController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates user and returns a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", todoController.login);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all Todos for the authenticated user
 *     description: Retrieves all todo items belonging to the logged-in user.
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *       401:
 *         description: Unauthorized (No token provided)
 *       500:
 *         description: Internal Server Error
 */

router.get("/", authMiddleware, todoController.getAllTodos);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a Todo by ID
 *     description: Retrieves a specific todo item for the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo item to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the todo item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *       401:
 *         description: Unauthorized (No token provided)
 *       404:
 *         description: Todo not found or not authorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", authMiddleware, todoController.getTodoById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new Todo
 *     description: Creates a new Todo item for the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, todoController.addTodo);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a Todo
 *     description: Deletes a specific todo item for the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo item to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized (No token provided)
 *       404:
 *         description: Todo not found or not authorized
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", authMiddleware, todoController.deleteTodo);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a Todo
 *     description: Updates a specific todo item for the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo item to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       400:
 *         description: Bad Request (Missing required fields)
 *       401:
 *         description: Unauthorized (No token provided)
 *       404:
 *         description: Todo not found or not authorized
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", authMiddleware, todoController.updateTodo);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out the user
 *     description: Invalidates the user session (if using session) or suggests token removal.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized - No token provided
 *       500:
 *         description: Internal Server Error
 */
router.post("/logout", authMiddleware, todoController.logout);


module.exports = router;

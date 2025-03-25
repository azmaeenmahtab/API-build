const db = require("../config/db");
const bcrypt = require("bcrypt");

const Todo = {
    //---
    register: async (name, email, password) => {
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(password, saltRounds);

        const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPass]
        );

        return result.rows[0]; // ✅ Now returns the user
    },


    login: async (email, password) => {

        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        return result.rows[0];
    },

    //--

    getAllTodosByUser: async (userId) => {
        const result = await db.query("SELECT * FROM todolist WHERE user_id = $1", [userId]);
        return result.rows;
    },

    getTodoById: async (id, userId) => {
        const result = await db.query("SELECT * FROM todolist WHERE id = $1 AND user_id = $2", [id, userId]);
        return result.rows[0];
    },

    addTodo: async (userId, title, completed) => {
        const result = await db.query(
            "INSERT INTO todolist (user_id, title, completed) VALUES ($1, $2, $3) RETURNING *",
            [userId, title, completed]
        );
        return result.rows[0];
    },

    deleteTodo: async (id, userId) => {
        const result = await db.query("DELETE FROM todolist WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
        return result.rows[0];
    },

    updateTodo: async (id, userId, title, completed) => {
        const result = await db.query(
            "UPDATE todolist SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
            [title, completed, id, userId]
        );
        return result.rows[0];
    }
};

module.exports = Todo;

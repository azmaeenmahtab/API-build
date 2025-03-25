const db = require("../config/db");

const Todo = {
    getAllTodos: async () => {
        const result = await db.query("SELECT * FROM todolist");
        return result.rows;
    },

    getTodoById: async (id) => {
        const result = await db.query("SELECT * FROM todolist WHERE id = $1", [id]);
        return result.rows[0];
    },

    addTodo: async (title, description) => {
        const result = await db.query(
            "INSERT INTO todolist (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        return result.rows[0];
    },

    deleteTodo: async (id) => {
        const result = await db.query("DELETE FROM todolist WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    },

    updateTodo: async (id, title, description, is_completed) => {
        const result = await db.query(
            "UPDATE todolist SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *",
            [title, description, is_completed, id]
        );
        return result.rows[0];
    }
};

module.exports = Todo;

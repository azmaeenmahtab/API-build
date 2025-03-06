const express = require("express");
const router = express.Router();
const db = require("../config/db");

//getting all todos 
router.get("/", (req, res) => {
    db.query("SELECT * FROM todos", (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });

});

//getting individual todo
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query("SELECT * FROM todos WHERE id = $1", [id], (error, result) => {

        if (error) throw error;
        res.status(200).json(result.rows);
    })
});

//add a todo
router.post("/", (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        res.status(400).send(`title is required`);
    }
    db.query("INSERT INTO todos (title, description) VALUES ($1, $2)", [title, description], (error, result) => {
        if (error) throw error;
        res.status(201).json(result.rows);
    });
});

module.exports = router;
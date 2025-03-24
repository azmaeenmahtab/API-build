const express = require("express");
const router = express.Router();
const db = require("../config/db");

//getting all todos 
router.get("/", (req, res) => {
    try {
        db.query("SELECT * FROM todolist", (error, result) => {
            if (error) throw error;
            res.status(200).json(result.rows);
        });
    } catch (err) {
        res.status(500).send("internal server error");
    }
});

//getting individual todo
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query("SELECT * FROM todolist WHERE id = $1", [id], (error, result) => {

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
    db.query("INSERT INTO todolist (title, description) VALUES ($1, $2)", [title, description], (error, result) => {
        if (error) throw error;
        res.status(201).json(result.rows);
    });
});

//delete individual todo
router.delete("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        db.query("DELETE FROM todolist WHERE id = $1 returning *", [id], (error, result) => {
            if (error) throw error;

            res.status(200).send("SUCCESSFULY DELETED");
        })
    } catch (err) {
        res.status(500).send(result.rows);
    }
});

//update todo

router.put("/:id", (req, res) => {
    const { title, description, is_completed } = req.body;
    if (!title) {
        res.status(400).send("title is required");
        return;
    }
    if (!description) {
        res.status(400).send("description is required");
        return;
    }
    const id = parseInt(req.params.id);
    db.query("UPDATE todolist SET title = $1, description = $2, is_completed = $3 WHERE id = $4 returning *", [title, description, is_completed, id], (error, result) => {
        if (error) throw error;
        res.status(200).send(result.rows);
    })
})

module.exports = router;
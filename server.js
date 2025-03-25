const express = require("express");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/todos", todoRoutes);//main path of server

app.get("/", (req, res) => {
    res.send(`App is running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Todo app listening on port ${port}`);
});

module.exports = app;
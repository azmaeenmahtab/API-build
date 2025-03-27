const express = require("express");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todoRoutes");
const { swaggerUi, specs } = require("./config/swagger");
const cors = require("cors");
const { setupSwagger } = require("./config/swagger");



dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/todos", todoRoutes);//main path of server

setupSwagger(app);

app.get("/", (req, res) => {
    res.send(`App is running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Todo app listening on port ${port}`);
});



module.exports = app;
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const todoRoutes = require("./routes/todos")

dotenv.config()
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`app is running on port ${port}`)
})

app.use("/api/todos", todoRoutes); // main path for my server 

app.listen(port, () => {
    console.log(`todo app listening on port ${port}`)
});

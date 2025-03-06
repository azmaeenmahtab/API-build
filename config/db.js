const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "passwordez07",
    port: 5432,
    database: "todos",

});



module.exports = pool;
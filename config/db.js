const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Debugging: Check if .env is loading
console.log("Database URL:", process.env.SUPABASE_DB_URL ? "Loaded ✅" : "Not Loaded ❌");

const pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false },
});

// Check if database connection is successful
pool.connect()
    .then(() => console.log('✅ Connected to Supabase PostgreSQL'))
    .catch(err => {
        console.error('❌ Database Connection Error:', err.stack);
        process.exit(1); // Exit if connection fails
    });

module.exports = pool;

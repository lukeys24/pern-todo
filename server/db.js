const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Pullmanpikes1!",
    host: "localhost",
    post: 5432,
    database: "perntodo"
})

module.exports = pool;
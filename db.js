const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"carriejiffy",
    database:"phones_database",
    host:"localhost",
    port: 5432
});

module.exports = pool;
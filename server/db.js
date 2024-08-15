const Pool = require("pg").Pool;

const pool = new Pool({
  database: "perntodo",
  port: "5432",
  host: "localhost",
  user: "postgres",
  password: "Root",
});

module.exports = pool;

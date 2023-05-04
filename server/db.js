const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "0315",
  host: "localhost",
  port: 5432,
  database: "asl"
});

module.exports = pool;
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PsqlConnectionString,
});

module.exports = pool;

// src/pool.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PsqlConnectionString,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('PostgreSQL connected successfully');
  release(); // Release the client back to the pool
});

module.exports = pool;

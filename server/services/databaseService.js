const config = require("../config.json");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: config.databaseConfig.psqlConnectionString,
});

async function fetchFromDatabase(query, params, res, notFoundMessage) {
  try {
    const result = await pool.query(query, params);
    if (result.rows.length) {
      res.json(params ? result.rows[0] : result.rows);
    } else {
      res.status(404).send(notFoundMessage);
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error fetching data");
  }
}

const updateDatabase = async (query, params) => {
  try {
    const result = await pool.query(query, params);
    if (!result || result.rows.length === 0) {
      throw new Error("No data returned from the query");
    }
    return result.rows;
  } catch (error) {
    console.error("Error during database update:", error);
    throw new Error("Database update failed: " + error.message);
  }
};

module.exports = { fetchFromDatabase , updateDatabase };

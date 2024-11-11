// services/databaseService.js
const sqlite3 = require("sqlite3").verbose();
const config = require("../config.json");
const db = new sqlite3.Database(config.sqliteConfig.sqliteConnectionString);
function fetchFromDatabase(query, params, res, notFoundMessage) {
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Error fetching data");
    }
    if (rows.length) {
      res.json(rows.length === 1 ? rows[0] : rows);
    } else {
      res.status(404).send(notFoundMessage);
    }
  });
}

module.exports = { fetchFromDatabase };

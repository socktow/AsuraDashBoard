const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const config = require("../../config.json");

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
router.get("/guilds", (req, res) => {
  fetchFromDatabase("SELECT * FROM public.guildconfigs ORDER BY id ASC", null, res, "No guild configurations found");
});

router.get("/guilds/:guildid", (req, res) => {
  fetchFromDatabase("SELECT * FROM public.guildconfigs WHERE guildid = $1", [req.params.guildid], res, "Guild configuration not found");
});

module.exports = router;

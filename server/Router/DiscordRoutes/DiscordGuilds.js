const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const config = require("../../config.json");

// Kết nối đến SQLite
const db = new sqlite3.Database(config.sqliteConfig.sqliteConnectionString); 

// Hàm truy vấn cơ sở dữ liệu
async function fetchFromDatabase(query, params = [], res, notFoundMessage) {
  try {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Error fetching data");
        return;
      }

      if (rows.length === 1) {
        res.json(rows[0]);
      } else if (rows.length > 1) {
        rows.forEach((row) => {
          res.write(JSON.stringify(row) + "\n");
        });
        res.end();
      } else {
        res.status(404).send(notFoundMessage);
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Error fetching data");
  }
}

// Route lấy tất cả guilds
router.get("/guilds", (req, res) => {
  const query = "SELECT * FROM guildconfigs";
  fetchFromDatabase(query, [], res, "No guild configurations found");
});

// Route lấy guild theo GuildId
router.get("/guilds/:guildid", (req, res) => {
  const guildid = req.params.guildid;
  console.log("Requested GuildId:", guildid);

  const query = "SELECT * FROM guildconfigs WHERE GuildId = ?";
  fetchFromDatabase(query, [guildid], res, "Guild configuration not found");
});



module.exports = router;

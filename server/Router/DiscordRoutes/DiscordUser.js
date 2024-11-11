const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const config = require("../../config.json");
const db = new sqlite3.Database(config.sqliteConfig.sqliteConnectionString);

async function fetchFromDatabase(query, params, res, notFoundMessage) {
  try {
    if (params === null) {
      params = [];
    }
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Error fetching data");
        return;
      }
      console.log("Database query result:", rows);
      if (rows.length) {
        res.json(rows[0]);
      } else {
        console.log(notFoundMessage);
        res.status(404).send(notFoundMessage);
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Error fetching data");
  }
}

router.get("/users", (req, res) => {
  fetchFromDatabase("SELECT * FROM discorduser", [], res, "No users found");
});

router.get("/users/:id", (req, res) => {
  const query = `
    SELECT 
      discorduser.Id,
      discorduser.AvatarId,
      discorduser.ClubId,
      discorduser.CurrencyAmount,
      discorduser.DateAdded,
      discorduser.IsClubAdmin,
      discorduser.NotifyOnLevelUp,
      discorduser.TotalXp,
      discorduser.UserId,
      discorduser.Username,
      bankusers.balance AS BankBalance
    FROM discorduser
    LEFT JOIN bankusers ON discorduser.UserId = bankusers.UserId
    WHERE discorduser.UserId = ?`;

  fetchFromDatabase(query, [req.params.id], res, "User not found");
});

module.exports = router;

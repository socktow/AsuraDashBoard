const express = require("express");
const router = express.Router();
const { fetchFromDatabase } = require("../../services/databaseService");

router.get("/guilds", (req, res) => {
  fetchFromDatabase(
    "SELECT * FROM guildconfigs",
    [],
    res,
    "No guild configurations found"
  );
});

module.exports = router;

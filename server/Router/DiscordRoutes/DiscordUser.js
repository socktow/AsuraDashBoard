const express = require("express");
const router = express.Router();
const { fetchFromDatabase } = require("../../services/databaseService");

router.get("/users", (req, res) => {
  fetchFromDatabase("SELECT * FROM discorduser", [], res, "No users found");
});

module.exports = router;

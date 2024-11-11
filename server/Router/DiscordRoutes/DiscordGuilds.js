const express = require("express");
const router = express.Router();
const {fetchFromDatabase} = require("../../services/databaseService");

router.get("/guilds", (req, res) => {
  fetchFromDatabase("SELECT * FROM public.guildconfigs", null, res, "No guild configurations found");
});

router.get("/guilds/:guildid", (req, res) => {
  fetchFromDatabase("SELECT * FROM public.guildconfigs WHERE guildid = $1", [req.params.guildid], res, "Guild configuration not found");
});

module.exports = router;
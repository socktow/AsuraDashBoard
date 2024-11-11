const express = require("express");
const router = express.Router();
const {fetchFromDatabase} = require("../../services/databaseService");

router.get("/users", (req, res) => {
  fetchFromDatabase("SELECT * FROM public.discorduser", null, res, "No users found");
});
router.get("/users/:id", (req, res) => {
  fetchFromDatabase("SELECT * FROM public.discorduser WHERE userid = $1", [req.params.id], res, "User not found");
});

module.exports = router;
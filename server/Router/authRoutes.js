// router/authRoutes.js
const express = require("express");
const axios = require("axios");

module.exports = (pool, client) => {
  const router = express.Router();
  let users = {}; // Store users' info in memory

  router.get("/login", (req, res) => {
    const url = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URI)}&scope=identify%20guilds`;
    res.redirect(url);
  });

  router.get("/callback", async (req, res) => {
    if (!req.query.code) return res.status(400).send("Code not provided");

    const { code } = req.query;
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
    });

    try {
      const tokenResponse = await axios.post("https://discord.com/api/oauth2/token", params);
      const { access_token } = tokenResponse.data;

      const userResponse = await axios.get("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const { id, username, avatar } = userResponse.data;
      users[id] = { id, username, avatar };

      res.redirect(process.env.CLIENT_REDIRECT_URL); // Redirect to client
    } catch (error) {
      console.error("Error in Discord callback:", error.response ? error.response.data : error);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};

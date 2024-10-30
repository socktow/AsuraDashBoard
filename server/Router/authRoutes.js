const express = require("express");
const router = express.Router();
const axios = require("axios");

// Discord login route
router.get("/login", (req, res) => {
  const url =
    `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URI)}&scope=identify%20guilds`;

  res.redirect(url);
});

// Discord callback route
router.get("/callback", async (req, res) => {
  if (!req.query.code) {
    return res.status(400).send("Code not provided.");
  }

  const { code } = req.query;
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
  });

  try {
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      params
    );

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id, username, avatar } = userResponse.data;
    users[id] = { id, username, avatar };

    const guildsResponse = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    managedGuilds = guildsResponse.data.filter(guild => 
      guild.owner || (guild.permissions && (guild.permissions & 0x8))
    );

    res.redirect(process.env.CLIENT_REDIRECT_URL);
  } catch (error) {
    console.error("Error in Discord callback:", error.response ? error.response.data : error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

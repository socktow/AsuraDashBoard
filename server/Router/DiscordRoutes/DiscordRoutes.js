const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PsqlConnectionString,
});
let users = {};
let managedGuilds = [];

module.exports = (client) => {
  router.get("/auth/discord/login", (req, res) => {
    const url = `https://discord.com/oauth2/authorize?client_id=${
      process.env.DISCORD_CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.DISCORD_REDIRECT_URI
    )}&scope=identify%20guilds`;

    res.redirect(url);
  });
  router.get("/auth/discord/callback", async (req, res) => {
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

      const guildsResponse = await axios.get(
        "https://discord.com/api/users/@me/guilds",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      managedGuilds = guildsResponse.data.filter(
        (guild) => guild.owner || (guild.permissions && guild.permissions & 0x8)
      );

      await Promise.all(
        managedGuilds.map(async (guild) => {
          try {
            await axios.get(
              `https://discord.com/api/guilds/${guild.id}/members/${process.env.BOT_ID}`,
              { headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` } }
            );
            guild.botInGuild = true;
          } catch (error) {
            guild.botInGuild =
              error.response && error.response.status === 404
                ? false
                : guild.botInGuild;
          }
        })
      );

      res.redirect(process.env.CLIENT_REDIRECT_URL);
    } catch (error) {
      console.error(
        "Error in Discord callback:",
        error.response ? error.response.data : error
      );
      res.status(500).send("Internal Server Error");
    }
  });

  // Fetch current user info
  router.get("/user/me", async (req, res) => {
    const userId = Object.keys(users)[0];
    if (!userId) {
      return res.status(401).send("Not logged in");
    }
    try {
      const result = await pool.query(
        `
        SELECT userid, username, avatarid, totalxp, currencyamount 
        FROM discorduser 
        WHERE UserId = $1
      `,
        [userId]
      );
      const user = result.rows[0];
      if (user) {
        res.json({
          id: user.userid,
          username: user.username,
          avatarid: user.avatarid,
          totalXP: user.totalxp,
          currencyAmount: user.currencyamount,
        });
      } else {
        res.status(404).send("User info not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Error fetching user info");
    }
  });

  // Guilds route
  router.get("/guilds", async (req, res) => {
    try {
      if (!client.isReady()) {
        return res.status(503).json({ error: "Discord client is not ready" });
      }
      const response = managedGuilds.map((guild) => ({
        guild: {
          id: guild.id,
          name: guild.name,
          icon: guild.icon,
          banner: guild.banner,
          owner: guild.owner,
          permissions: guild.permissions,
          features: guild.features,
        },
        botInGuild: guild.botInGuild,
      }));

      res.json(response);
    } catch (error) {
      console.error("Error fetching guilds:", error);
      res.status(500).json({ error: "Failed to fetch guilds" });
    }
  });

  return router;
};

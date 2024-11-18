const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require('../../config.json');
let users = {};
let managedGuilds = [];

module.exports = (client) => {

  router.get("/auth/discord/login", (req, res) => {
    const url = `https://discord.com/oauth2/authorize?client_id=${
      config.botConfig.clientId
    }&response_type=code&redirect_uri=${encodeURIComponent(
      config.botConfig.redirectUri
    )}&scope=identify%20guilds`;

    res.redirect(url);
  });

  router.get("/auth/discord/logout", (req, res) => {
    const userId = Object.keys(users)[0];
    
    if (!userId) {
      return res.status(400).json({ error: "No user is logged in" });
    }
    delete users[userId];
    managedGuilds = [];
    res.redirect(config.botConfig.logoutRedirectUrl || "/");
  });

  
  router.get("/auth/discord/callback", async (req, res) => {
    if (!req.query.code) {
      return res.status(400).send("Authorization code not provided.");
    }
  
    const { code } = req.query;
    const params = new URLSearchParams({
      client_id: config.botConfig.clientId,
      client_secret: config.botConfig.clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: config.botConfig.redirectUri,
    });
  
    try {
      // Lấy token từ Discord
      const tokenResponse = await axios.post(
        "https://discord.com/api/oauth2/token",
        params.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const { access_token, expires_in, refresh_token } = tokenResponse.data;
  
      // Lấy thông tin người dùng từ Discord
      const userResponse = await axios.get("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      const { id, username, avatar, banner } = userResponse.data;
  
      // Lưu người dùng vào bộ nhớ tạm
      users[id] = {
        id,
        username,
        avatar,
        banner,
        access_token,
        refresh_token,
        expires_at: Date.now() + expires_in * 1000, // Thời gian hết hạn token
      };
  
      // Lấy danh sách server mà người dùng tham gia
      const guildsResponse = await axios.get(
        "https://discord.com/api/users/@me/guilds",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
  
      managedGuilds = guildsResponse.data.filter(
        (guild) => guild.owner || (guild.permissions && guild.permissions & 0x8)
      );
  
      // Kiểm tra bot có trong server không
      await Promise.all(
        managedGuilds.map(async (guild) => {
          try {
            await axios.get(
              `https://discord.com/api/guilds/${guild.id}/members/${config.botConfig.botId}`,
              { headers: { Authorization: `Bot ${config.botConfig.token}` } }
            );
            guild.botInGuild = true;
          } catch (error) {
            guild.botInGuild = error.response?.status === 404 ? false : null;
          }
        })
      );
  
      // Redirect về client với token
      res.redirect(
        `${config.botConfig.clientRedirectUrl}?token=${encodeURIComponent(
          access_token
        )}`
      );
    } catch (error) {
      console.error(
        "Error in Discord callback:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Internal Server Error.");
    }
  });
  

  router.get("/user/me", async (req, res) => {
    const userId = Object.keys(users)[0];
    if (!userId) {
      return res.status(401).send("Not logged in");
    }
  
    try {
      const user = users[userId]; 
      if (user) {
        res.json({
          id: user.id,
          username: user.username,
          avatarid: user.avatar,
          bannerid: user.banner
        });
      } else {
        res.status(404).send("User info not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Error fetching user info");
    }
  });

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
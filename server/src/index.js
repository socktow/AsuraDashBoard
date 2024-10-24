const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

let users = {}; // Store user information
let managedGuilds = []; // Store guilds the user can manage

// Initialize your Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Fetch current user info
router.get("/user/me", async (req, res) => {
  const user = users[0]; // Get the first user (consider improving this)
  if (user) {
    const userData = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    };
    res.json(userData);
  } else {
    res.status(404).send("User info not found");
  }
});

// Discord login route
router.get("/auth/discord/login", async (req, res) => {
  const url =
    `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URI)}&scope=identify%20guilds`;

  res.redirect(url);
});

// Discord callback route
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

    // Get user info
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id, username, avatar } = userResponse.data;

    // Store user info
    users[0] = { id, username, avatar }; // Consider improving to store multiple users

    // Fetch user's guilds
    const guildsResponse = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const guilds = guildsResponse.data;

    // Filter guilds the user can manage
    managedGuilds = guilds.filter(guild => 
      guild.owner || (guild.permissions && (guild.permissions & 0x8))
    );

    // Check if bot is in those guilds
    const botInGuilds = await Promise.all(
      managedGuilds.map(async guild => {
        console.log(`Fetching bot member for guild ID: ${guild.id}`);
        try {
          const botInGuildResponse = await axios.get(
            `https://discord.com/api/guilds/${guild.id}/members/${process.env.BOT_ID}`,
            {
              headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
              },
            }
          );
          return { guild, botInGuild: true };
        } catch (error) {
          if (error.response && error.response.status === 404) {
            return { guild, botInGuild: false };
          } else {
            console.error(error.response.data);
            throw error;
          }
        }
      })
    );

    console.log(botInGuilds);
    res.redirect(process.env.CLIENT_REDIRECT_URL); // Redirect to client
  } catch (error) {
    console.error("Error in Discord callback:", error.response ? error.response.data : error);
    res.status(500).send("Internal Server Error");
  }
});

// Guilds route
app.get('/guilds', async (req, res) => {
  try {
    // Make sure the client is logged in
    if (!client.isReady()) {
      return res.status(503).json({ error: 'Discord client is not ready' });
    }

    // Return only managed guilds
    res.json(managedGuilds.map(guild => ({
      id: guild.id,
      name: guild.name,
      owner: guild.owner,
      permissions: guild.permissions,
      botInGuild: guild.botInGuild,
    })));
  } catch (error) {
    console.error('Error fetching guilds:', error);
    res.status(500).json({ error: 'Failed to fetch guilds' });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

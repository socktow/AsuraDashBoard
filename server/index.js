const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();
const router = express.Router();
const { Pool } = require("pg");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

// Initialize your Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const pool = new Pool({
  connectionString: process.env.PsqlConnectionString,
});

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Store user information
let users = {}; 

// Fetch current user info
router.get("/user/me", async (req, res) => {
  const userId = Object.keys(users)[0];
  if (!userId) {
    return res.status(401).send("Not logged in");
  }

  try {
    console.log("Fetching user info from the database");

    const result = await pool.query(`
      SELECT userid, username, avatarid, totalxp, currencyamount 
      FROM discorduser 
      WHERE UserId = $1
    `, [userId]);

    const user = result.rows[0];

    if (user) {
      const userData = {
        id: user.userid, // Access UserId as it is in the result
        username: user.username,
        avatarid: user.avatarid,
        totalXP: user.totalxp,
        currencyAmount: user.currencyamount,
      };

      console.log("User data fetched successfully:", userData);
      res.json(userData);
    } else {
      console.log("User not found");
      res.status(404).send("User info not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error fetching user info");
  }
});

// Discord login route
router.get("/auth/discord/login", (req, res) => {
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
    users[id] = { id, username, avatar }; // Store multiple users based on their ID

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
    await Promise.all(
      managedGuilds.map(async guild => {
        try {
          await axios.get(
            `https://discord.com/api/guilds/${guild.id}/members/${process.env.BOT_ID}`,
            {
              headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
              },
            }
          );
          guild.botInGuild = true; // Mark bot as in the guild
        } catch (error) {
          if (error.response && error.response.status === 404) {
            guild.botInGuild = false; // Bot is not in the guild
          } else {
            console.error(error.response.data);
            throw error;
          }
        }
      })
    );

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
    const response = managedGuilds.map(guild => ({
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
    console.error('Error fetching guilds:', error);
    res.status(500).json({ error: 'Failed to fetch guilds' });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

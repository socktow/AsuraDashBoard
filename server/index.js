const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const userRoutes = require("./router/userRoutes");
const authRoutes = require("./router/authRoutes");
const guildRoutes = require("./router/guildRoutes");

app.use("/user", userRoutes);
app.use("/auth/discord", authRoutes);
app.use("/guilds", guildRoutes);

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

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

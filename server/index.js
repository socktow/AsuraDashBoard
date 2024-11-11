const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const app = express();

// Initialize Discord client with token from config
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(config.botConfig.token);
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routers and pass the Discord client instance
const DiscordRoutes = require('./Router/DiscordRoutes/DiscordRoutes')(client);
const MomoPaymentRouter = require('./Router/MomoPayment/MomoPayment');
const ZalopaymentRouter = require('./Router/ZaloPayment/ZaloPayment');
const DiscordUserRoutes = require('./Router/DiscordRoutes/DiscordUser');
const DiscordGuildsRoutes = require('./Router/DiscordRoutes/DiscordGuilds')
// Use routes
app.use('/momo', MomoPaymentRouter);
app.use('/zalo', ZalopaymentRouter);
app.use(DiscordRoutes);
app.use('/api', DiscordUserRoutes);
app.use('/api', DiscordGuildsRoutes);

// Error handler
app.use((err, res) => {
  console.error("An error occurred:", err.message);
  res.status(500).send("Internal Server Error");
});

// Use port from config
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
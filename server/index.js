const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();

// Initialize Discord client
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

// Import routers and pass the Discord client instance
const DiscordRoutes = require('./Router/DiscordRoutes/DiscordRoutes')(client);
const MomoPaymentRouter = require('./Router/MomoPayment/MomoPayment');
const ZalopaymentRouter = require('./Router/ZaloPayment/ZaloPayment');

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use('/momo', MomoPaymentRouter);
app.use('/zalo', ZalopaymentRouter);
app.use(DiscordRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

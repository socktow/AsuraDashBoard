const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");
const connectToMongoDB = require("./services/MongoService");

const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(config.botConfig.token);
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

connectToMongoDB(config.MongoURI);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DiscordRoutes = require("./Router/DiscordRoutes/DiscordRoutes")(client);
const MomoPaymentRouter = require("./Router/MomoPayment/MomoPayment");
const ZalopaymentRouter = require("./Router/ZaloPayment/ZaloPayment");
const DiscordUserRoutes = require("./Router/DiscordRoutes/DiscordUser");
const DiscordGuildsRoutes = require("./Router/DiscordRoutes/DiscordGuilds");
const PaymentRouter = require("./Router/Payment/Payment");
// Use routes
app.use("/momo", MomoPaymentRouter);
app.use("/zalo", ZalopaymentRouter);
app.use("/api", DiscordUserRoutes);
app.use("/api", DiscordGuildsRoutes);
app.use("/api/payments", PaymentRouter);
app.use(DiscordRoutes);
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.message);
  res.status(500).send("Internal Server Error");
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

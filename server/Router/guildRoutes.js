const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (!client.isReady()) {
      return res.status(503).json({ error: 'Discord client is not ready' });
    }

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

module.exports = router;

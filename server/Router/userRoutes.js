const express = require("express");
const router = express.Router();
const pool = require("../db"); // Assuming pool is set up in db/pool.js
const users = require("../userStore"); // Import users from userStore.js

router.get("/user/me", async (req, res) => {
  const userId = Object.keys(users)[0];
  if (!userId) {
    return res.status(401).send("Not logged in");
  }
  try {
    const result = await pool.query(
      `SELECT userid, username, avatarid, totalxp, currencyamount 
       FROM discorduser 
       WHERE UserId = $1`,
      [userId]
    );
    const user = result.rows[0];
    if (user) {
      const userData = {
        id: user.userid,
        username: user.username,
        avatarid: user.avatarid,
        totalXP: user.totalxp,
        currencyAmount: user.currencyamount,
      };
      res.json(userData);
    } else {
      res.status(404).send("User info not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error fetching user info");
  }
});

module.exports = router;

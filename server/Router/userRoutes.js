const express = require("express");
const router = express.Router();
const pool = require("../db"); // assuming you move the `pool` configuration to a separate file or export it

// Store user information
let users = {}; 

// Fetch current user info
router.get("/me", async (req, res) => {
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
        id: user.userid,
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

module.exports = router;

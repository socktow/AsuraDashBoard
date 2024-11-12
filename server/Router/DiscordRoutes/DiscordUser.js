const express = require("express");
const router = express.Router();
const { fetchFromDatabase, updateDatabase } = require("../../services/databaseService");

router.get("/users", (req, res) => {
  const query = `
    SELECT d.*, b.balance
    FROM public.discorduser d
    LEFT JOIN public.bankusers b ON d.userid = b.userid
  `;
  fetchFromDatabase(query, null, res, "No users found");
});

router.route("/users/:id").get((req, res) => {
  const { id } = req.params;
  const query = `
    SELECT d.*, b.balance
    FROM public.discorduser d
    LEFT JOIN public.bankusers b ON d.userid = b.userid
    WHERE d.userid = $1;
  `;
  fetchFromDatabase(query, [id], res, "No user found with this ID");
});

router.route("/users/:id").patch(async (req, res) => {
  const { totalxp, currencyamount, balance } = req.body;
  const userid = req.params.id;

  const updateFields = {
    totalxp: totalxp || null,
    currencyamount: currencyamount || null,
    balance: balance || null,
  };

  try {
    const updateUserQuery = `
      UPDATE public.discorduser
      SET totalxp = COALESCE($1, totalxp), currencyamount = COALESCE($2, currencyamount)
      WHERE userid = $3
      RETURNING *;
    `;
    const userParams = [updateFields.totalxp, updateFields.currencyamount, userid];
    const userResult = await updateDatabase(updateUserQuery, userParams);

    if (!userResult || userResult.length === 0) {
      return res.status(404).json({ message: "User not found or update failed" });
    }
    if (updateFields.balance !== null) {
      const updateBalanceQuery = `
        UPDATE public.bankusers
        SET balance = $1
        WHERE userid = $2
        RETURNING *;
      `;
      const balanceResult = await updateDatabase(updateBalanceQuery, [updateFields.balance, userid]);

      if (!balanceResult || balanceResult.length === 0) {
        return res.status(404).json({ message: "Bank account not found or update failed" });
      }
      return res.json({
        message: "User and bank account updated successfully",
        user: userResult,
        balance: balanceResult,
      });
    }
    return res.json({
      message: "User updated successfully",
      user: userResult,
    });
  } catch (error) {
    console.error("An error occurred during update:", error);
    return res.status(500).json({ message: "An error occurred during update", error: error.message });
  }
});

router.route("/users/:id/balance").patch(async (req, res) => {
  const { balance } = req.body;
  const userid = req.params.id;

  try {
    const updateBalanceQuery = `
      UPDATE public.bankusers
      SET balance = balance + $1
      WHERE userid = $2
      RETURNING *;
    `;
    const balanceResult = await updateDatabase(updateBalanceQuery, [balance, userid]);

    if (!balanceResult || balanceResult.length === 0) {
      return res.status(404).json({ message: "Bank account not found or update failed" });
    }

    return res.json({
      message: "Bank account balance updated successfully",
      balance: balanceResult,
    });

  } catch (error) {
    console.error("An error occurred during balance update:", error);
    return res.status(500).json({ message: "An error occurred during balance update", error: error.message });
  }
});


module.exports = router;

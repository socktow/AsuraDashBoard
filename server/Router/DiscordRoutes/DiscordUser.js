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

router.get("/users/:id/transactions", (req, res) => {
  fetchFromDatabase(
    "SELECT * FROM currencytransactions WHERE userid = $1 ORDER BY id ASC",
    [req.params.id],
    res,
    "User not found"
  );
});

router.patch("/users/:id/payment", (req, res) => {
  // something
  const { amount } = req.body;
  const { userId } = req.params;

  if (typeof amount !== 'number') {
    return res.status(400).json({ message: "Invalid amount value" });
  }
})

router.route("/users/:id/config").patch(async (req, res) => {
  const { balance } = req.body;
  const userId = req.params.id;

  if (typeof balance !== 'number') {
    return res.status(400).json({ message: "Invalid balance value" });
  }

  try {
    const query = `
      UPDATE public.bankusers
      SET balance = balance + $1
      WHERE userid = $2
      RETURNING balance;
    `;
    const [result] = await updateDatabase(query, [balance, userId]);

    if (!result) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    res.json({
      message: `${balance > 0 ? "Deposit" : "Withdrawal"} successful`,
      newBalance: result.balance,
    });
  } catch (error) {
    console.error("Balance update error:", error);
    res.status(500).json({ message: "Balance update failed", error: error.message });
  }
});

module.exports = router;

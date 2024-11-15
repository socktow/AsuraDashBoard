const mongoose = require("mongoose");

const UserPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  transactionId: { type: String, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model("UserPayment", UserPaymentSchema);

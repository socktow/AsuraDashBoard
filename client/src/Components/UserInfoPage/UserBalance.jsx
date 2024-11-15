import React, { useState } from "react";

const UserBalance = () => {
  const [inputAmount, setInputAmount] = useState("");
  const [error, setError] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false); 

  const handleTransaction = () => {
    setError("");
    if (inputAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }
    
    if (isWithdraw && inputAmount > 1250) {
      setError("Insufficient funds for withdrawal.");
      return;
    }

    console.log(`${isWithdraw ? "Withdrawn" : "Deposited"}: $${inputAmount}`);
    setInputAmount("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Balance Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Current Balance</h2>
        <p className="text-4xl font-bold text-green-600 mt-2">$1,250.00</p>
      </div>

      {/* Toggle between Deposit and Withdraw */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsWithdraw(false)}
          className={`w-1/2 py-2 rounded-lg ${!isWithdraw ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Deposit
        </button>
        <button
          onClick={() => setIsWithdraw(true)}
          className={`w-1/2 py-2 rounded-lg ${isWithdraw ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Withdraw
        </button>
      </div>

      {/* Deposit or Withdraw Section */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isWithdraw ? "Withdraw Funds" : "Deposit Funds"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Balance</label>
            <input
              type="text"
              value="$1,250.00"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank</label>
            <input
              type="text"
              value="Bank of America"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isWithdraw ? "Withdraw Amount" : "Deposit Amount"}
            </label>
            <input
              type="number"
              min="1"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleTransaction}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Confirm {isWithdraw ? "Withdrawal" : "Deposit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBalance;

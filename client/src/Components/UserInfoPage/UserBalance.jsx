import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Input, Button, message } from "antd";
const { Text } = Typography;

const formatCurrency = (amount) => parseInt(amount).toLocaleString("en-US");

const UserBalance = () => {
  const [inputAmount, setInputAmount] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const userById = useSelector((state) => state.user.userById);

  if (!userById) {
    return <p>Loading...</p>;
  }

  const handleTransaction = () => {
    if (!inputAmount || inputAmount <= 0) {
      message.error("Amount must be greater than 0.");
      return;
    }

    if (inputAmount > userById.currencyamount) {
      message.error("Insufficient funds for withdrawal.");
      return;
    }
    if (inputAmount > userById.balance) {
      message.error("Insufficient funds for deposit.");
      return;
    }

    message.success(
      `${isWithdraw ? "Withdrawn" : "Deposited"}: ${formatCurrency(
        inputAmount
      )}`
    );
    setInputAmount("");
  };

  const userFields = [
    { display: "Current Balance", key: "currencyamount" },
    { display: "Bank", key: "balance" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Account Summary
        </h2>
        <p className="text-4xl font-bold text-green-600 mt-2">
          {formatCurrency(userById.currencyamount)}
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          type={!isWithdraw ? "primary" : "default"}
          size="large"
          onClick={() => setIsWithdraw(false)}
          className="w-1/2"
        >
          Deposit
        </Button>
        <Button
          type={isWithdraw ? "primary" : "default"}
          size="large"
          onClick={() => setIsWithdraw(true)}
          className="w-1/2"
        >
          Withdraw
        </Button>
      </div>
      <div className="mt-6 space-y-4 w-full">
        {userFields.map(({ display, key }, index) => (
          <div key={index} className="border-b pb-2">
            <Text strong className="block text-red-700 text-lg">
              {display}:{" "}
              <Text className="text-lg font-semibold">
                {formatCurrency(userById[key])}
              </Text>
            </Text>
          </div>
        ))}
      </div>

      <div className="mt-6 ">
        <Input
          type="number"
          placeholder={`Enter amount to ${isWithdraw ? "withdraw" : "deposit"}`}
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          className="mb-4 text-lg text-black bg-white"
        />
        <Button type="primary" size="large" block onClick={handleTransaction}>
          {isWithdraw ? "Withdraw" : "Deposit"}
        </Button>
      </div>
    </div>
  );
};

export default UserBalance;

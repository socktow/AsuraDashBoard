import React from 'react';

const UserBalance = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Balance Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Current Balance</h2>
        <p className="text-4xl font-bold text-green-600 mt-2">$1,250.00</p>
      </div>

      {/* Recent Transactions Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        <ul className="space-y-2 mt-2">
          <li className="flex justify-between text-gray-700">
            <span>Deposit</span>
            <span className="text-green-600">+ $500.00</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span>Purchase</span>
            <span className="text-red-600">- $100.00</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span>Transfer</span>
            <span className="text-blue-600">- $250.00</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg">Add Funds</button>
        <button className="w-1/2 bg-gray-600 text-white py-2 rounded-lg">View History</button>
      </div>
    </div>
  );
};

export default UserBalance;

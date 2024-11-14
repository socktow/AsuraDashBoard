import React, { useState } from 'react';

const UserTrans = () => {
  const transactions = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    type: index % 2 === 0 ? 'Deposit' : 'Purchase',
    amount: (index + 1) * 50,
    date: new Date().toLocaleDateString(),
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 15;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>

      {/* Transaction List */}
      <ul className="space-y-2">
        {currentTransactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between text-gray-700">
            <span>{transaction.type}</span>
            <span>{transaction.amount > 0 ? `+ $${transaction.amount}` : `- $${transaction.amount}`}</span>
            <span className="text-sm text-gray-500">{transaction.date}</span>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:bg-gray-300"
        >
          Prev
        </button>
        <span className="text-lg font-medium">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTrans;

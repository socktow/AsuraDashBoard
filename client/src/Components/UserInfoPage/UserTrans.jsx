import React, { useState, useEffect } from "react";
import api from "../../Api/Api";

const UserTrans = ({ prods }) => {
  const { userInfo, userById } = prods;
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const transactionsPerPage = 15;

  useEffect(() => {
    const fetchUserTransactions = async () => {
      if (userById?.id && transactions.length === 0) {
        setLoading(true);
        try {
          const transResponse = await api.getTransById(userById.userid);
          const fetchedTransactions = transResponse.data
            .map((transaction) => ({
              id: transaction.id,
              amount: transaction.amount,
              type: transaction.type,
              extra: transaction.extra || "N/A",
              date: new Date(transaction.dateadded).toLocaleDateString(),
            }))
            .sort((a, b) => new Date(b.dateadded) - new Date(a.dateadded));
          setTransactions(fetchedTransactions);
        } catch (err) {
          setError("Failed to load transactions.");
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchUserTransactions();
  }, [userById, transactions.length]);  

  // Pagination calculations
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format number with commas
  const formatNumber = (number) =>
    number.toLocaleString(undefined, { minimumFractionDigits: 0 });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Transaction History for {userInfo?.name || "User"}
      </h2>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 font-bold">
                Date
              </th>
              <th className="border border-gray-200 px-4 py-2 font-bold">
                Amount
              </th>
              <th className="border border-gray-200 px-4 py-2 font-bold">
                Type
              </th>
              <th className="border border-gray-200 px-4 py-2 font-bold">
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className="text-center">
                <td className="border border-gray-200 px-4 py-2 font-bold">
                  {transaction.date}
                </td>
                <td
                  className={`border border-gray-200 px-4 py-2 font-bold ${
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.amount > 0
                    ? `+ ${formatNumber(transaction.amount)}`
                    : `- ${formatNumber(Math.abs(transaction.amount))}`}
                </td>
                <td className="border border-gray-200 px-4 py-2 font-bold">
                  {transaction.type}
                </td>
                <td className="border border-gray-200 px-4 py-2 font-bold">
                  {transaction.extra}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>
        <span className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg">
          {currentPage}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-500"
          }`}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserTrans;

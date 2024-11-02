import React from "react";

const MoMoSuccess = ({ orderDetails, responseTime, orderInfo }) => {
  const formatResponseTime = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          MOMO Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase! Your order has been successfully
          processed.
        </p>

        <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition mb-6">
          Go to Console
        </button>

        <div className="border-t border-gray-300 mt-6 pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment Details
          </h2>
          <div className="text-left space-y-2">
            <p className="text-gray-600">
              <strong>Response Time:</strong> {formatResponseTime(responseTime)}
            </p>
            <p className="text-gray-600">
              <strong>Order Info:</strong> {orderInfo}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-6 pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Order Details
          </h2>
          <div className="text-left space-y-2">
            <p className="text-gray-600">
              <strong>Transaction ID:</strong> {orderDetails.transId}
            </p>
            <p className="text-gray-600">
              <strong>Amount:</strong> {orderDetails.amount}
            </p>
            <p className="text-gray-600">
              <strong>Message:</strong> {orderDetails.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoMoSuccess;

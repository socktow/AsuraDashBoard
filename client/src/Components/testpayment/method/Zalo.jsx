// ZaloSuccess.jsx
import React from 'react';

const ZaloSuccess = ({ orderDetails, amount, bankCode }) => {
  return (
    <div>
      <h2>ZaloPay Payment Successful!</h2>
      <p>Amount: {amount}</p>
      <p>Bank Code: {bankCode}</p>
      {orderDetails && (
        <div>
          <h3>Order Details:</h3>
          <pre>{JSON.stringify(orderDetails, null, 2)}</pre> {/* Pretty print order details */}
        </div>
      )}
    </div>
  );
}

export default ZaloSuccess;

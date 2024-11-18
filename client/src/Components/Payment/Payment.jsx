import React, { useState } from 'react';
import MoMoPayment from './method/MoMoPayment';
import ZaloPayment from './method/ZaloPayment';
import { useSelector } from 'react-redux';
import './Payment.scss';

const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const { user } = useSelector((state) => state.user);

  if (!user) return <span>Not logged in.</span>;
  const coinMultiplier = 10;

  const amounts = [
    { value: 20000, label: '20,000 VND' },
    { value: 50000, label: '50,000 VND' },
    { value: 100000, label: '100,000 VND' },
    { value: 200000, label: '200,000 VND' },
    { value: 500000, label: '500,000 VND' },
    { value: 1000000, label: '1,000,000 VND' },
  ];

  const handleSelectAmount = (value) => {
    setSelectedAmount(value);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-title">
          <h2>Chọn Mệnh Giá Nạp Thẻ</h2>
        </div>
        <div className="amounts-grid">
          {amounts.map(({ value, label }) => (
            <div
              key={value}
              className={`amount-item ${selectedAmount === value ? 'selected' : ''}`}
              onClick={() => handleSelectAmount(value)}
            >
              <h3>{label}</h3>
            </div>
          ))}
        </div>
        <div className="payment-methods">
          {selectedAmount && (
            <>
              <MoMoPayment selectedAmount={selectedAmount} />
              <ZaloPayment selectedAmount={selectedAmount} />
            </>
          )}
        </div>

        <div className="user-info">
          <h2>Thông Tin Người Dùng</h2>
          <p>User ID: {user.id}</p>
        </div>

        <div className="payment-info">
          <h2>Thông Tin Giá Nạp</h2>
          {selectedAmount ? (
            <p>
              {selectedAmount} VND = {selectedAmount * coinMultiplier} Coin
            </p>
          ) : (
            <p>Vui lòng chọn mệnh giá để xem thông tin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;

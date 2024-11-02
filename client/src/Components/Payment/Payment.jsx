import React, { useState } from 'react';
import MoMoPayment from './method/MoMoPayment';
import ZaloPayment from './method/ZaloPayment';

const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const coinMultiplier = 10;

  const amounts = [
    { value: 20000, label: '20,000 VND' },
    { value: 50000, label: '50,000 VND' },
    { value: 100000, label: '100,000 VND' },
    { value: 200000, label: '200,000 VND' },
    { value: 500000, label: '500,000 VND' },
    { value: 1000000, label: '1,000,000 VND' },
  ];

  // Function to handle amount selection
  const handleSelectAmount = (value) => {
    setSelectedAmount(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        {/* Left Section for Denominations */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">Chọn Mệnh Giá Nạp Thẻ</h2>
          <div className="grid grid-cols-3 gap-4">
            {amounts.map(({ value, label }) => (
              <div
                key={value}
                className={`cursor-pointer flex items-center justify-center h-40 rounded-lg transition-colors 
                  ${selectedAmount === value ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white border'}`}
                onClick={() => handleSelectAmount(value)}
              >
                <h3 className="text-lg font-semibold text-black">{label}</h3>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            {selectedAmount && (
              <>
                <MoMoPayment selectedAmount={selectedAmount} />
                <ZaloPayment selectedAmount={selectedAmount} />
              </>
            )}
          </div>
        </div>
        <div className="mt-8 border-t pt-4">
          <h2 className="text-2xl font-bold mb-4 text-black">Thông Tin Giá Nạp</h2>
          {selectedAmount ? (
            <p className="text-lg text-black">
              {selectedAmount} VND = {selectedAmount * coinMultiplier} Coin
            </p>
          ) : (
            <p className="text-lg text-black">Vui lòng chọn mệnh giá để xem thông tin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;

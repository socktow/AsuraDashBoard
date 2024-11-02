import React from 'react';
import { message } from 'antd';
import api from '../../../Api/Api'; // Adjust the import based on your file structure
import 'animate.css';

const ZaloPayment = ({ selectedAmount }) => {
  const handleZaloPayment = async () => {
    try {
      const orderInfo = {
        amount: selectedAmount,
        productName: 'Recharge',
        productDescription: 'Recharge using ZaloPay',
      };

      const response = await api.createZaloPayment(orderInfo);
      
      if (response.return_code === 1 && response.sub_return_code === 1) {
        message.success('ZaloPay payment link created successfully!');
        window.location.href = response.order_url;
      } else {
        message.error('Failed to create ZaloPay payment link. Please try again.');
        console.error('ZaloPay response:', response);
      }
    } catch (error) {
      message.error('Failed to create ZaloPay payment link.');
      console.error('ZaloPay Error:', error);
    }
  };

  return (
    <button 
      onClick={handleZaloPayment} 
      className="w-full h-12 rounded-lg bg-black text-white transition-all duration-300 
        hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center"
    >
      <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="ZaloPay Logo" className="w-6 h-6 mr-2" />
      Thanh Toán Bằng ZaloPay
    </button>
  );
};

export default ZaloPayment;

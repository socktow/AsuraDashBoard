import React from 'react';
import { Button, message } from 'antd';
import api from '../../../Api/Api'; // Adjust the import based on your file structure

const ZaloPayment = ({ selectedAmount }) => {
  const handleZaloPayment = async () => {
    try {
      // Prepare the payload for Zalo payment
      const orderInfo = {
        amount: selectedAmount,
        productName: 'Recharge',
        productDescription: 'Recharge using ZaloPay',
      };

      const response = await api.createZaloPayment(orderInfo);
      
      // Check if the payment was successful
      if (response.return_code === 1 && response.sub_return_code === 1) {
        message.success('ZaloPay payment link created successfully!');
        // Redirect to the ZaloPay order URL
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
    <Button type="primary" onClick={handleZaloPayment} style={{ marginTop: '20px' }}>
      Thanh Toán Bằng ZaloPay
    </Button>
  );
};

export default ZaloPayment;

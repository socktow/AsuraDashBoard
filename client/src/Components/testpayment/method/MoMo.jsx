// MoMoSuccess.jsx
import React from 'react';
import { Result, Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const MoMoSuccess = ({ orderDetails, responseTime, orderInfo }) => {
  const formatResponseTime = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString();
  };

  return (
    <Result
      status="success"
      title="Payment Successful"
      subTitle="Thank you for your purchase. Your order has been successfully processed."
      extra={[
        <Button type="primary" key="console">
          Go to Console
        </Button>,
        <Card key="params" style={{ marginTop: '20px', textAlign: 'left' }}>
          <Title level={4}>Payment Details:</Title>
          <div style={{ marginBottom: '10px' }}>
            <Text strong>Response Time:</Text> {formatResponseTime(responseTime)}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text strong>Order Info:</Text> {orderInfo}
          </div>
          <Title level={4} style={{ marginTop: '20px' }}>Order Details from Server:</Title>
          <div style={{ marginBottom: '10px' }}>
            <Text strong>Transaction ID:</Text> {orderDetails.transId}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text strong>Amount:</Text> {orderDetails.amount}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text strong>Payment Type:</Text> {orderDetails.payType}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Text strong>Message:</Text> {orderDetails.message}
          </div>
        </Card>
      ]}
    />
  );
};

export default MoMoSuccess;

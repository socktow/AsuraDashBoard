// PaymentSuccess.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Button, Result, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import api from '../../Api/Api';
import MoMoSuccess from './method/MoMo';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [isValid, setIsValid] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const orderId = queryParams.get('orderId');
    api.checkMomoPayment(orderId)
      .then(response => {
        if (response.resultCode === 0) {
          setIsValid(true);
          setOrderDetails(response);
        } else {
          setIsValid(false);
        }
      })
      .catch(error => {
        console.error('There was an error verifying the payment!', error);
        setIsValid(false);
      });
  }, [queryParams]);

  if (isValid === null) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isValid) {
    return (
      <Result
        status="error"
        title="Payment Verification Failed"
        subTitle="The order ID or payment details are invalid."
        extra={[
          <Button type="primary" key="console">
            Go to Console
          </Button>,
          <Button key="buy">Try Again</Button>,
        ]}
      />
    );
  }

  return (
    <MoMoSuccess 
      orderDetails={orderDetails} 
      responseTime={queryParams.get('responseTime')} 
      orderInfo={queryParams.get('orderInfo')} 
    />
  );
}

export default PaymentSuccess;

import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../Api/Api';
import MoMoSuccess from './method/MoMo';
import ZaloSuccess from './method/Zalo';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [isValid, setIsValid] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const paymentMethod = queryParams.get('partnerCode') === 'MOMO' ? 'momo' : 'zalo';
  useEffect(() => {
    const orderId = queryParams.get('orderId');
    const appTransId = queryParams.get('apptransid');

    if (paymentMethod === 'zalo') {
      // Call Zalo payment check API
      api.checkZaloPayment(appTransId)
        .then(response => {
          if (response.return_code === 1) {
            setIsValid(true);
            setOrderDetails(response);
          } else {
            setIsValid(false);
          }
        })
        .catch(error => {
          console.error('Error verifying Zalo payment!', error);
          setIsValid(false);
        });
    } else {
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
          console.error('Error verifying MoMo payment!', error);
          setIsValid(false);
        });
    }
  }, [queryParams, paymentMethod]);

  if (isValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 to-red-400 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-800 mb-4">Oops! Payment Verification Failed</h1>
        <p className="text-lg text-gray-800 mb-6">The order ID or payment details are invalid. Please check and try again.</p>
        <img src="https://via.placeholder.com/150" alt="Error illustration" className="mb-4" />
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Go to Console
          </button>
          <button className="bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (paymentMethod === 'zalo') {
    return (
      <ZaloSuccess 
        orderDetails={orderDetails} 
        responseTime={queryParams.get('responseTime')} 
        orderInfo={queryParams.get('orderInfo')} 
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

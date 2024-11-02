import React, { useState } from 'react';
import { message } from 'antd';
import api from '../../../Api/Api';
import 'animate.css';

const MoMoPayment = ({ selectedAmount }) => {
  const [loading, setLoading] = useState(false);

  const handleMomoPayment = async () => {
    if (!selectedAmount) {
      message.warning("Vui lòng chọn mệnh giá trước khi thanh toán.");
      return;
    }

    setLoading(true);

    try {
      const orderInfo = "Thanh toán nạp thẻ";
      const response = await api.createMomoPayment(selectedAmount, orderInfo);

      const payUrl = response?.payUrl;

      if (payUrl) {
        message.success("Đang chuyển đến MoMo để thanh toán...");
        window.location.href = payUrl; 
      } else {
        message.error("Không thể lấy URL thanh toán từ phản hồi.");
      }
    } catch (error) {
      message.error("Không thể khởi tạo thanh toán MoMo. " + error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <button 
      onClick={handleMomoPayment} 
      disabled={loading}
      className={`w-full h-12 rounded-lg text-white transition-all duration-300 
        ${loading ? 'bg-gray-500' : 'bg-black hover:bg-blue-600'} 
        focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center`}
    >
      <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" alt="MoMo Logo" className="w-6 h-6 mr-2" />
      {loading ? "Đang xử lý..." : "Thanh toán bằng MoMo"}
    </button>
  );
};

export default MoMoPayment;

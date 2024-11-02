import React, { useState } from 'react';
import { message } from 'antd';
import api from '../../../Api/Api';

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

      console.log(response);

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
    <div>
      <button onClick={handleMomoPayment} disabled={loading}>
        {loading ? "Đang xử lý..." : "Thanh toán bằng MoMo"}
      </button>
    </div>
  );
};

export default MoMoPayment;

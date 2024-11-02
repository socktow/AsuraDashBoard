import axios from "axios";

const BASE_URL = "http://localhost:4000";

// Helper function for handling payment requests
const handlePayment = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error with payment at ${endpoint}:`, error);
    throw error;
  }
};

const api = {
  getUserGuilds: () => axios.get(`${BASE_URL}/guilds`),
  getUserInfo: () => axios.get(`${BASE_URL}/user/me`),
  createMomoPayment: async (amount, orderInfo) => {
    return await handlePayment("momo/payment", { amount, orderInfo });
  },
  checkMomoPayment: async (orderId) => {
    return await handlePayment("momo/checkmomopayment", { orderId });
  },
  createZaloPayment: async (orderInfo) => {
    return await handlePayment("zalo/payment", {
      amount: orderInfo.amount,
      productName: orderInfo.productName,
      productDescription: orderInfo.productDescription,
    });
  },

  checkZaloPayment: async (app_trans_id) => {
    return await handlePayment("zalo/checkzalopayment", { app_trans_id });
  },
};

export default api;

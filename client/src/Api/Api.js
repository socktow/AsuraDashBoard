import axios from "axios";

const BASE_URL = "http://localhost:4000";
const apiCall = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error with ${endpoint}:`, error);
    throw error;
  }
};

const api = {
  getUserGuilds: () => axios.get(`${BASE_URL}/guilds`),
  getUserInfo: () => axios.get(`${BASE_URL}/user/me`),
  getGuildById: (guildId) => axios.get(`${BASE_URL}/api/guilds/${guildId}`), // Fix here
  // Payment Method
  createMomoPayment: (amount, orderInfo) => apiCall("momo/payment", { amount, orderInfo }),
  checkMomoPayment: (orderId) => apiCall("momo/checkmomopayment", { orderId }),
  createZaloPayment: ({ amount, productName, productDescription }) => apiCall("zalo/payment", { amount, productName, productDescription }),
  checkZaloPayment: (app_trans_id) => apiCall("zalo/checkzalopayment", { app_trans_id }),
};

export default api;

import axios from "./Axios";
const api = {
  // Guild API
  getUserGuilds: () => {
    return axios.get("/guilds");
  },

  // User API
  getUserInfo: () => {
    return axios.get("/user/me");
  }
};

export default api;

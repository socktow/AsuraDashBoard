import axios from "./axios";

const userApi = {
  getUserInfo: () => {
    return axios.get("/user/me");
  },
};

export default userApi;

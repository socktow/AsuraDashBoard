import axios from "axios";

// Tạo một instance của Axios
const instance = axios.create({
  baseURL: "http://localhost:4000", // Cấu hình URL gốc của API
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

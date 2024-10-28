// src/components/Login.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserInfo from "../Components/UserInfoPage/UserInfo"; // Điều chỉnh lại đường dẫn nếu cần
import { fetchUserInfo } from "../Redux/UserSlice"; // Đảm bảo đường dẫn đến file slice là đúng

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    // Nếu đã có user, gọi action để lấy thông tin người dùng
    if (user) {
      dispatch(fetchUserInfo());
      navigate("/user"); // Chuyển hướng đến trang /user nếu đã đăng nhập
    }
  }, [dispatch, user, navigate]); // Thêm navigate vào dependencies

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {status === "loading" && (
        <span className="text-gray-500 animate-pulse">Loading...</span>
      )}
      {status === "failed" && (
        <span className="text-red-500 animate-bounce">Error fetching user data.</span>
      )}
      {user ? (
        <UserInfo user={user} />
      ) : (
        <span className="text-gray-700">Not logged in.</span>
      )}
      {!user && (
        <a
          className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 text-white transition-colors duration-300 mt-4 transform hover:scale-105 hover:shadow-lg"
          href="http://localhost:4000/auth/discord/login"
        >
          <div className="h-7 w-7 fill-white hover:fill-white/80 mr-4" />
          <span className="text-sm">Sign in with Discord</span>
        </a>
      )}
    </div>
  );
}

export default Login;

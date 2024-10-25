// src/components/Login.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "../Components/UserInfoPage/UserInfo"; // Điều chỉnh lại đường dẫn nếu cần
import { fetchUserInfo } from "../Redux/UserSlice"; // Đảm bảo đường dẫn đến file slice là đúng

function Login() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    // Nếu đã có user, gọi action để lấy thông tin người dùng
    if (user) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, user]);

  return (
    <div>
      {status === "loading" && <span>Loading...</span>}
      {status === "failed" && <span>Error fetching user data.</span>}
      {user ? (
        <UserInfo user={user} />
      ) : (
        <span>Not logged in.</span>
      )}
      {!user && (
        <a
          className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300"
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

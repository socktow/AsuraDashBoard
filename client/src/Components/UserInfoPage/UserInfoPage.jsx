import React, { useEffect, useState } from "react";
import userApi from "../../Api/userApi";
import UserInfo from "./UserInfo";

function UserInfoPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Gọi API lấy thông tin người dùng
    userApi
      .getUserInfo()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div>
      {user ? <UserInfo user={user} /> : <span>Not logged in.</span>}
      <a
        className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300"
        href="http://localhost:4000/auth/discord/login"
      >
        <div className="h-7 w-7 fill-white hover:fill-white/80 mr-4" />
        <span className="text-sm">Sign in with Discord</span>
      </a>
    </div>
  );
}

export default UserInfoPage;

// src/components/UserInfoPage.js
import React from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo"; // Đảm bảo đường dẫn đến component UserInfo là chính xác

function UserInfoPage() {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      {user ? (
        <UserInfo user={user} />
      ) : (
        <span>Not logged in.</span>
      )}
    </div>
  );
}

export default UserInfoPage;

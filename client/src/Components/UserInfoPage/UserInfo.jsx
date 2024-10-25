import React from "react";

function UserInfo({ user }) {
  if (!user) return <span>Not logged in.</span>;

  return (
    <div>
      <h1>Hello, {user.username}!</h1>
    </div>
  );
}

export default UserInfo;

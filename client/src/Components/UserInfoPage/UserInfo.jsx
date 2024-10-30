import React from "react";
import { Card, Avatar, Typography } from "antd";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;

function formatCurrency(amount) {
  return parseInt(amount).toLocaleString("en-US");
}

function UserInfo({ user }) {
  if (!user) return <span>Not logged in.</span>;

  const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatarid}.png`;

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg border border-gray-200">
        <div className="flex flex-col items-center">
          <Avatar src={avatarUrl} size={80} className="mb-4" />
          <Title level={3} className="text-center">
            Hello, {user.username}!
          </Title>
        </div>

        <div className="mt-6 space-y-2">
          <Text strong className="block">
            Total XP: <Text>{user.totalXP}</Text>
          </Text>
          <Text strong className="block">
            Currency: <Text>{formatCurrency(user.currencyAmount)}</Text>
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default UserInfo;

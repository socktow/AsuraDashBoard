import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Typography, Spin } from "antd";
import api from "../../Api/Api";  // Import api from Api.js
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;

function formatCurrency(amount) {
  return parseInt(amount).toLocaleString("en-US");
}

function UserInfo() {
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chỉ gọi backend nếu user.id tồn tại
    if (user && user.id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await api.getUserInfoById(user.id); // Call the method from api
          setUserInfo(response.data); // Assuming response contains .data
        } catch (err) {
          setError("Failed to fetch user information");
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserInfo();
    }
  }, [user]);

  if (!user) return <span>Not logged in.</span>;

  if (loading) {
    return <div className="flex justify-center items-center h-screen p-4"><Spin size="large" /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen p-4 text-red-500">{error}</div>;
  }

  const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

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
          {userInfo ? (
            <>
              <Text strong className="block">
                Total XP: <Text>{userInfo.TotalXp}</Text>
              </Text>
              <Text strong className="block">
                Currency: <Text>{formatCurrency(userInfo.CurrencyAmount)}</Text>
              </Text>
              <Text strong className="block">
                Bank: <Text>{formatCurrency(userInfo.BankBalance || 0)}</Text>
              </Text>
            </>
          ) : (
            <Text>Loading user information...</Text>
          )}
        </div>
      </Card>
    </div>
  );
}

export default UserInfo;

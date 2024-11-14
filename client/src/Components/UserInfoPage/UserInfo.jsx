import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Spin, Alert } from "antd";
import api from "../../Api/Api";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;

const formatCurrency = (amount) => parseInt(amount).toLocaleString("en-US");

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfoResponse = await api.getUserInfo();
        const basicInfo = userInfoResponse.data;
        setUserInfo(basicInfo);
        if (basicInfo && basicInfo.id) {
          const userDetailsResponse = await api.getUserInfoById(basicInfo.id);
          const userDetails = userDetailsResponse.data[0];
          setUser({
            ...userDetails,
            username: basicInfo.username,
            avatarid: basicInfo.avatarid,
          });
        } else {
          throw new Error("User ID is undefined");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Không thể tải dữ liệu người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Spin tip="Đang tải..." />;
  if (error) return <Alert message={error} type="error" showIcon />;

  const avatarUrl = `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatarid}.png`;
  const bannerUrl = `https://cdn.discordapp.com/banners/${userInfo.id}/${userInfo.bannerid}.png?size=512`;
  const userFields = [
    { display: "APP-ID ", key: "id" },
    { display: "Tổng XP ", key: "totalxp" },
    { display: "Số dư ", key: "currencyamount" },
    { display: "Ngân hàng ", key: "balance" },
    { display: "Clan ", key: "clubid" },
  ];

  return (
    <div className="w-full h-screen p-4 flex flex-col items-center">
      <Card className="w-full lex-grow">
        <div className="flex flex-col items-center p-4">
          <div className="flex flex-col items-center space-y-4 mb-6 w-full">
            <Avatar src={avatarUrl} size={100} className="border-4 border-white" />
            <img src={bannerUrl} alt="User Banner" className="w-full h-32 rounded-lg object-cover" />
          </div>
          <Title level={3} className="text-center text-gray-800 font-semibold w-full">
            Xin chào, {user.username}!
          </Title>
          <div className="mt-6 space-y-4 w-full">
            {userFields.map(({ display, key }, index) => (
              <div key={index} className="border-b pb-2">
                <Text strong className="block text-gray-700 text-lg">
                  {display}: <Text className="text-gray-900 font-semibold">{formatCurrency(user[key])}</Text>
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserInfo;

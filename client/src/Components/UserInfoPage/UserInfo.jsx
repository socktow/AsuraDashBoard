import React from "react";
import { Card, Avatar, Typography } from "antd";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;

const formatCurrency = (amount) => parseInt(amount).toLocaleString("en-US");

const UserInfo = ({ prods }) => {
  const { userInfo, userById } = prods;

  if (!userInfo || !userById) {
    return <p>Loading...</p>;
  }

  const avatarUrl =
    userInfo?.id && userInfo?.avatarid
      ? `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatarid}.png`
      : "";
  const bannerUrl =
    userInfo?.id && userInfo?.bannerid
      ? `https://cdn.discordapp.com/banners/${userInfo.id}/${userInfo.bannerid}.png`
      : "";

  const userFields = [
    { display: "APP-ID ", key: "id" },
    { display: "Tổng XP ", key: "totalxp" },
    { display: "Số dư ", key: "currencyamount" },
    { display: "Ngân hàng ", key: "balance" },
    { display: "Clan ", key: "clubid" },
    { display: "Vip ", key: "vip" },
    { display: "Payment ", key: "payment" },
  ];

  return (
    <div className="w-full h-screen p-4 flex flex-col items-center">
      <Card className="w-full flex-grow">
        <div className="flex flex-col items-center p-4">
          <div className="relative w-full mb-6">
            {bannerUrl && (
              <img
                src={bannerUrl}
                alt="Banner"
                className="w-full h-32 rounded-lg object-cover"
              />
            )}
            {avatarUrl && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mt-16">
                <Avatar
                  src={avatarUrl}
                  size={100}
                  className="border-4 border-white shadow-lg mb-4 z-10"
                />
              </div>
            )}
          </div>

          <Title level={3} className="text-center text-gray-800 font-semibold w-full">
            Xin chào, {userInfo.username}!
          </Title>

          <div className="mt-6 space-y-4 w-full">
            {userFields.map(({ display, key }, index) => (
              <div key={index} className="border-b pb-2">
                <Text strong className="block text-gray-700 text-lg">
                  {display}:{" "}
                  <Text className="text-gray-900 font-semibold">
                    {formatCurrency(userById[key])}
                  </Text>
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

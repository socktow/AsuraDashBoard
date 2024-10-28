import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link để điều hướng
import guildApi from "../../Api/Api";
import Guilds from "./Guilds";

function GuildsPage() {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    guildApi
      .getUserGuilds()
      .then((response) => {
        // Cập nhật dữ liệu guilds để thêm thuộc tính botInGuild
        const updatedGuilds = response.data.map(guild => ({
          ...guild,
          botInGuild: false // Giả định mặc định, cập nhật sau khi có dữ liệu từ backend
        }));
        setGuilds(updatedGuilds);
      })
      .catch((error) => console.error("Error fetching guilds:", error));
  }, []);

  return (
    <div>
      {guilds.length > 0 ? ( // Kiểm tra nếu có guilds
        <Guilds guilds={guilds} />
      ) : (
        <div className="text-center">
          <p className="mb-4">Bạn cần đăng nhập để truy cập trang này.</p>
          <Link
            className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300"
            to="/user"
          >
            <span className="text-sm">Đăng nhập với Discord</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default GuildsPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link để điều hướng
import guildApi from "../../Api/guildApi";
import Guilds from "./Guilds";

function GuildsPage() {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    // Gọi API lấy danh sách guilds
    guildApi
      .getUserGuilds()
      .then((response) => {
        setGuilds(response.data);
      })
      .catch((error) => console.error("Error fetching guilds:", error));
  }, []);

  return (
    <div>
      {guilds.length > 0 ? ( // Kiểm tra nếu có guilds
        <Guilds guilds={guilds} />
      ) : (
        <div className="text-center">
          <h2 className="text-lg">Bạn chưa có guild nào.</h2>
          <p className="mb-4">Bạn cần đăng nhập để truy cập trang này.</p>
          <Link
            className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300"
            to="/user" // Liên kết đến trang đăng nhập
          >
            <span className="text-sm">Đăng nhập với Discord</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default GuildsPage;

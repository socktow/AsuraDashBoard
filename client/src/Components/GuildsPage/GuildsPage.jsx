import React, { useEffect, useState } from "react";
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
      <Guilds guilds={guilds} />
    </div>
  );
}

export default GuildsPage;

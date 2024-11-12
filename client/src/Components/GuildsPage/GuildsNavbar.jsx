import React, { useEffect, useState } from "react";
import { Spin, Typography, Select, Layout } from "antd";
import guildApi from "../../Api/Api";
import GuildsBanner from "./GuildsBanner";
import GuildsInfo from "./GuildsInfo";

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Sider, Content } = Layout;

function GuildsNavbar() {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validGuilds, setValidGuilds] = useState([]);
  const [selectedGuildId, setSelectedGuildId] = useState(null);

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const response = await guildApi.getUserGuilds();
        setGuilds(response.data);
        const validGuildsWithBots = await checkValidGuilds(response.data);
        setValidGuilds(validGuildsWithBots);
      } catch (err) {
        setError("Failed to fetch guilds. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuilds();
  }, []);

  const checkValidGuilds = async (guilds) => {
    const guildPromises = guilds.map(async (guild) => {
      if (guild.botInGuild) {
        try {
          const response = await guildApi.getGuildById(guild.guild.id);
          if (response.status === 200) {
            return guild;
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            console.log(`Guild with ID ${guild.guild.id} not found.`);
          } else {
            console.error("Error checking guild:", err);
          }
        }
      }
      return null;
    });

    return (await Promise.all(guildPromises)).filter(Boolean);
  };

  const handleSelectGuild = (guildId) => {
    setSelectedGuildId(guildId);
  };

  if (loading) return <Spin tip="Loading guilds..." size="large" />;
  if (error) return <Paragraph style={{ color: "red" }}>{error}</Paragraph>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={300} style={{ background: "#fff", paddingTop: "20px" }}>
        <div style={{ padding: "20px" }}>
          <Title level={3}>Select Guild with Bots:</Title>
          {validGuilds.length > 0 ? (
            <Select
              style={{ width: "100%" }}
              placeholder="Select a guild"
              onChange={handleSelectGuild}
            >
              {validGuilds.map((guild) => (
                <Option key={guild.guild.id} value={guild.guild.id}>
                  {guild.guild.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Paragraph style={{ color: "#8c8c8c" }}>
              No guilds with bots available.
            </Paragraph>
          )}
        </div>
      </Sider>
      <Layout style={{ marginLeft: "10px" }}>
        <Content style={{ padding: "30px", background: "#fff" }}>
          <div>
            <GuildsBanner />
            {selectedGuildId && <GuildsInfo guildId={selectedGuildId} />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default GuildsNavbar;

import React, { useEffect, useState } from "react";
import { Spin, Typography, Select, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import guildApi from "../../Api/Api";

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Sider, Content } = Layout;

function GuildsNavbar() {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validGuilds, setValidGuilds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        // Step 1: Fetch user guilds
        const response = await guildApi.getUserGuilds();
        setGuilds(response.data);

        // Step 2: Filter guilds that have bots and check if they exist
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

  // Function to check if guild exists by making API call to getGuildById
  const checkValidGuilds = async (guilds) => {
    const guildPromises = guilds.map(async (guild) => {
      if (guild.botInGuild) {
        try {
          // Step 3: Check if guild configuration exists (i.e., make the API call to getGuildById)
          const response = await guildApi.getGuildById(guild.guild.id);
          if (response.status === 200) {
            return guild; // Guild is valid and has bot
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            // Guild does not exist, return null to filter out this guild
            console.log(`Guild with ID ${guild.guild.id} not found.`);
          } else {
            console.error("Error checking guild:", err);
          }
        }
      }
      return null; // Return null for invalid guilds
    });

    // Step 4: Resolve all promises and filter out null values (invalid guilds)
    const validGuilds = (await Promise.all(guildPromises)).filter(Boolean);
    return validGuilds;
  };

  const handleSelectGuild = (guildId) => {
    navigate(`/guilds/${guildId}`);
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
      <Layout style={{ padding: "24px" }}>
        <Content
          style={{
            padding: "24px",
            background: "#fff",
            minHeight: "100vh",
            marginLeft: "300px",
          }}
        >
          <h1>Guilds Content</h1>
          <p>Additional content related to guilds would go here.</p>
        </Content>
      </Layout>
    </Layout>
  );
}

export default GuildsNavbar;

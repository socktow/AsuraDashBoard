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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const response = await guildApi.getUserGuilds();
        setGuilds(response.data);
      } catch (err) {
        setError("Failed to fetch guilds. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuilds();
  }, []);

  const guildsWithBot = guilds.filter((guild) => guild.botInGuild);

  if (loading) return <Spin tip="Loading guilds..." size="large" />;
  if (error) return <Paragraph style={{ color: "red" }}>{error}</Paragraph>;

  const handleSelectGuild = (guildId) => {
    navigate(`/guilds/${guildId}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={300} style={{ background: "#fff", paddingTop: "20px" }}>
        <div style={{ padding: "20px" }}>
          <Title level={3}>Select Guild with Bots:</Title>
          {guildsWithBot.length > 0 ? (
            <Select
              style={{ width: "100%" }}
              placeholder="Select a guild"
              onChange={handleSelectGuild}
            >
              {guildsWithBot.map((guild) => (
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

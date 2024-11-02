import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Spin, Typography } from "antd"; 
import { Link } from "react-router-dom";
import guildApi from "../../Api/Api";

const { Title, Paragraph } = Typography;

function Guilds() {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const guildsWithoutBot = guilds.filter((guild) => !guild.botInGuild);

  if (loading) return <Spin tip="Loading guilds..." size="large" />;
  if (error) return <Paragraph style={{ color: "red" }}>{error}</Paragraph>;

  return (
    <div style={{ padding: "24px", marginTop: "96px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={3}>Guilds with Bots:</Title>
        {guildsWithBot.length > 0 ? (
          <Row gutter={[16, 16]}>
            {guildsWithBot.map((guild) => (
              <Col span={8} key={guild.guild.id}>
                <Link to={`/guilds/${guild.guild.id}`}>
                  <Card
                    hoverable
                    style={{
                      backgroundColor: "#f0f2f5",
                      transition: "all 0.3s",
                    }}
                  >
                    <Title level={4} style={{ fontWeight: "bold" }}>
                      {guild.guild.name}
                    </Title>
                    <Paragraph type="secondary">
                      {guild.guild.owner ? "Owner" : "Member"}
                    </Paragraph>
                    <Paragraph style={{ color: "green" }}>Available</Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <Paragraph style={{ color: "#8c8c8c" }}>
            No guilds with bots available.
          </Paragraph>
        )}
      </div>

      <div>
        <Title level={3}>Guilds without Bots:</Title>
        {guildsWithoutBot.length > 0 ? (
          <Row gutter={[16, 16]}>
            {guildsWithoutBot.map((guild) => (
              <Col span={8} key={guild.guild.id}>
                <Link to={`/guilds/${guild.guild.id}`}>
                  <Card
                    hoverable
                    style={{
                      backgroundColor: "#f0f2f5",
                      transition: "all 0.3s",
                    }}
                  >
                    <Title level={4} style={{ fontWeight: "bold" }}>
                      {guild.guild.name}
                    </Title>
                    <Paragraph type="secondary">
                      {guild.guild.owner ? "Owner" : "Member"}
                    </Paragraph>
                    <Button type="primary" style={{ marginTop: "8px" }}>
                      Invite
                    </Button>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <Paragraph style={{ color: "#8c8c8c" }}>
            No guilds without bots available.
          </Paragraph>
        )}
      </div>
    </div>
  );
}

export default Guilds;

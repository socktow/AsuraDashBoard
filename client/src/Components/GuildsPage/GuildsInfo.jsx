import React, { useEffect, useState } from "react";
import { Spin, Typography, Card, Row, Col, Image } from "antd";
import { useParams } from "react-router-dom";
import guildApi from "../../Api/Api";
import GuildsNavbar from "./GuildsNavbar";

const { Title, Paragraph } = Typography;

const GuildsInfo = () => {
  const { guildId } = useParams();
  const [guildInfo, setGuildInfo] = useState(null);
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guildsResponse, guildInfoResponse] = await Promise.all([
          guildApi.getUserGuilds(),
          guildApi.getGuildById(guildId),
        ]);
        setGuilds(guildsResponse.data);
        setGuildInfo(guildInfoResponse.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [guildId]);

  if (loading) return <Spin tip="Loading guild info..." size="large" />;
  if (error) return <Paragraph style={{ color: "red" }}>{error}</Paragraph>;

  const guild = guilds.find((g) => g.guild.id === guildId);

  if (!guild || !guildInfo) return <Paragraph>No information found for this guild.</Paragraph>;

  const { name, icon, banner } = guild.guild;
  const { prefix, deletemessageoncommand, dmgreetmessagetext, boostmessage, dateadded } = guildInfo;

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <Card
        title={`Guild: ${name}`}
        bordered={false}
        style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}
      >
        {/* Banner */}
        {banner && (
          <Row gutter={16}>
            <Col span={24}>
              <Image
                src={`https://cdn.discordapp.com/banners/${guildId}/${banner}.png`}
                alt="Guild Banner"
                preview={false}
                style={{ width: "100%", height: "auto", borderRadius: "8px", marginBottom: "16px" }}
              />
            </Col>
          </Row>
        )}

        {/* Guild Icon and Information */}
        <Row gutter={16}>
          {/* Guild Icon */}
          {icon && (
            <Col span={8}>
              <Image
                src={`https://cdn.discordapp.com/icons/${guildId}/${icon}.png`}
                alt="Guild Icon"
                preview={false}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "50%",
                  marginBottom: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
              />
            </Col>
          )}

          {/* Guild Details */}
          <Col span={16}>
            <Title level={3}>Guild Information</Title>
            <Paragraph><strong>Prefix:</strong> {prefix}</Paragraph>
            <Paragraph><strong>Delete message on command:</strong> {deletemessageoncommand ? "Yes" : "No"}</Paragraph>
            <Paragraph><strong>Greeting message:</strong> {dmgreetmessagetext}</Paragraph>
            <Paragraph><strong>Boost message:</strong> {boostmessage}</Paragraph>
            <Paragraph><strong>Date Added:</strong> {new Date(dateadded).toLocaleString()}</Paragraph>
          </Col>
        </Row>
      </Card>

      {/* Guilds Navbar */}
      <div style={{ marginTop: "24px" }}>
        <GuildsNavbar />
      </div>
    </div>
  );
};

export default GuildsInfo;

import React, { useEffect, useState } from "react";
import { Spin, Typography, Card, Row, Col, Image } from "antd";
import guildApi from "../../Api/Api";

const { Title, Paragraph } = Typography;

const GuildsInfo = ({ guildId }) => {
  const [guildInfo, setGuildInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `Guilds Info : ${guildId}`;

    const fetchGuildInfo = async () => {
      try {
        const response = await guildApi.getGuildById(guildId);
        setGuildInfo(response.data);
      } catch (err) {
        setError("Failed to fetch guild info. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuildInfo();
  }, [guildId]);

  if (loading) return <Spin tip="Loading guild info..." size="large" />;
  if (error) return <Paragraph style={{ color: "red" }}>{error}</Paragraph>;
  if (!guildInfo) return <Paragraph>No information found for this guild.</Paragraph>;

  const { prefix, deletemessageoncommand, dmgreetmessagetext, filterinvites, boostmessage, dateadded } = guildInfo;

  return (
    <div >
      <Card
        title={`Guild: ${guildInfo.name}`}
        bordered={false}
        style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}
      >
        {/* Banner */}
        {guildInfo.banner && (
          <Row gutter={16}>
            <Col span={24}>
              <Image
                src={`https://cdn.discordapp.com/banners/${guildId}/${guildInfo.banner}.png`}
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
          {guildInfo.icon && (
            <Col span={8}>
              <Image
                src={`https://cdn.discordapp.com/icons/${guildId}/${guildInfo.icon}.png`}
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
          <Col span={16}>
            <Title level={3}>Guild Information</Title>
            <Paragraph><strong>Prefix:</strong> {prefix}</Paragraph>
            <Paragraph><strong>Delete message on command:</strong> {deletemessageoncommand ? "Yes" : "No"}</Paragraph>
            <Paragraph><strong>Greeting message:</strong> {dmgreetmessagetext}</Paragraph>
            <Paragraph><strong>Boost message:</strong> {boostmessage}</Paragraph>
            <Paragraph><strong>Filter invites:</strong> {filterinvites}</Paragraph>
            <Paragraph><strong>Date Added:</strong> {new Date(dateadded).toLocaleString()}</Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default GuildsInfo;

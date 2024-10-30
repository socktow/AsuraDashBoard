import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Spin, Typography } from "antd"; 
import { Link } from "react-router-dom";
import guildApi from "../../Api/Api";
import "animate.css"; // Ensure this is imported

const { Title, Paragraph } = Typography;

function Guilds() {
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const response = await guildApi.getUserGuilds();
        setGuilds(response.data); // Assuming response.data contains the guilds array
      } catch (err) {
        setError('Failed to fetch guilds. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuilds();
  }, []);

  // Split guilds into two arrays: with bots and without bots
  const guildsWithBot = guilds.filter(guild => guild.botInGuild);
  const guildsWithoutBot = guilds.filter(guild => !guild.botInGuild);  

  if (loading) return <Spin tip="Loading guilds..." size="large" />; // Show loading spinner
  if (error) return <Paragraph className="text-red-500">{error}</Paragraph>; // Show error message

  return (
    <div className="p-4 mt-96">
      <div className="mb-6">
        <Title level={3} className="text-xl font-semibold ">Guilds with Bots:</Title>
        {guildsWithBot.length > 0 ? (
          <Row gutter={[16, 16]}>
            {guildsWithBot.map((guild) => (
              <Col span={8} key={guild.guild.id} className="mb-4 animate__animated animate__fadeIn">
                <Link to={`/guilds/${guild.guild.id}`}>
                  <Card 
                    hoverable 
                    className="bg-gray-100 transition-shadow duration-300 hover:shadow-lg animate__animated animate__zoomIn"
                  >
                    <Title level={4} className="text-lg font-bold">{guild.guild.name}</Title>
                    <Paragraph className="text-sm text-gray-500">{guild.guild.owner ? "Owner" : "Member"}</Paragraph>
                    <Paragraph className="text-sm text-green-500">Available</Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <Paragraph className="text-gray-500">No guilds with bots available.</Paragraph>
        )}
      </div>

      <div>
        <Title level={3} className="text-xl font-semibold ">Guilds without Bots:</Title>
        {guildsWithoutBot.length > 0 ? (
          <Row gutter={[16, 16]}>
            {guildsWithoutBot.map((guild) => (
              <Col span={8} key={guild.guild.id} className="mb-4 animate__animated animate__fadeIn">
                <Link to={`/guilds/${guild.guild.id}`}>
                  <Card 
                    hoverable 
                    className="bg-gray-100 transition-shadow duration-300 hover:shadow-lg animate__animated animate__zoomIn"
                  >
                    <Title level={4} className="text-lg font-bold">{guild.guild.name}</Title>
                    <Paragraph className="text-sm text-gray-500">{guild.guild.owner ? "Owner" : "Member"}</Paragraph>
                    <Button type="primary" className="mt-2">Invite</Button>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <Paragraph className="text-gray-500">No guilds without bots available.</Paragraph>
        )}
      </div>
    </div>
  );
}

export default Guilds;

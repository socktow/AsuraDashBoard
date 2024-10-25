import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Spin } from "antd"; 
import { Link } from "react-router-dom";
import guildApi from "../../Api/guildApi";

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
  if (error) return <p className="text-red-500">{error}</p>; // Show error message

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Guilds:</h2>

      <h3 className="text-xl font-semibold mb-2">Guilds with Bots:</h3>
      {guildsWithBot.length > 0 ? (
        <Row gutter={16}>
          {guildsWithBot.map((guild) => (
            <Col span={8} key={guild.guild.id} className="mb-4">
              <Link to={`/guilds/${guild.guild.id}`}>
                <Card 
                  hoverable 
                  className="bg-gray-100 transition-shadow duration-300 hover:shadow-lg"
                >
                  <h3 className="text-lg font-bold">{guild.guild.name}</h3>
                  <p className="text-sm text-gray-500">{guild.guild.owner ? "Owner" : "Member"}</p>
                  <p className="text-sm text-green-500">Available</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-gray-500">No guilds with bots available.</p>
      )}

      <h3 className="text-xl font-semibold mt-4 mb-2">Guilds without Bots:</h3>
      {guildsWithoutBot.length > 0 ? (
        <Row gutter={16}>
          {guildsWithoutBot.map((guild) => (
            <Col span={8} key={guild.guild.id} className="mb-4">
              <Link to={`/guilds/${guild.guild.id}`}>
                <Card 
                  hoverable 
                  className="bg-gray-100 transition-shadow duration-300 hover:shadow-lg"
                >
                  <h3 className="text-lg font-bold">{guild.guild.name}</h3>
                  <p className="text-sm text-gray-500">{guild.guild.owner ? "Owner" : "Member"}</p>
                  <Button type="primary" className="mt-2">Invite</Button>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-gray-500">No guilds without bots available.</p>
      )}
    </div>
  );
}

export default Guilds;

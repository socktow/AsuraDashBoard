import React from 'react';
import { Card, Button, Col, Row, Avatar } from 'antd';

const partners = [
  {
    name: 'Partner One',
    description: 'Description for Partner One.',
    discordLink: 'https://discord.gg/example1', // Thay thế bằng link thật
    avatar: 'https://i.pravatar.cc/150?img=1', // URL của avatar
  },
  {
    name: 'Partner Two',
    description: 'Description for Partner Two.',
    discordLink: 'https://discord.gg/example2', // Thay thế bằng link thật
    avatar: 'https://i.pravatar.cc/150?img=2', // URL của avatar
  },
  {
    name: 'Partner Three',
    description: 'Description for Partner Three.',
    discordLink: 'https://discord.gg/example3', // Thay thế bằng link thật
    avatar: 'https://i.pravatar.cc/150?img=3', // URL của avatar
  },
];

const Partner = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', color: 'rgb(25, 245, 170)' }}>Partners</h1>
      <Row gutter={[16, 16]} justify="center">
        {partners.map((partner) => (
          <Col xs={24} sm={12} md={8} key={partner.name}>
            <Card
              hoverable
              bordered={false}
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Avatar size={64} src={partner.avatar} style={{ marginBottom: '10px' }} />
                <h3 style={{ margin: 0, fontSize: '20px' }}>{partner.name}</h3>
                <p style={{ color: '#888', marginTop: '5px' }}>{partner.description}</p>
              </div>
              <Button type="primary" style={{ marginTop: '10px' }} onClick={() => window.open(partner.discordLink, '_blank')}>
                Join Discord
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Partner;

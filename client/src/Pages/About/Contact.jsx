import React from 'react';
import { Card, Button, Col, Row, Avatar } from 'antd';
import { UserOutlined, CustomerServiceOutlined, TeamOutlined } from '@ant-design/icons';

const roles = [
  {
    title: 'Admin',
    description: 'Contact the Admin for general inquiries and account-related issues.',
    contact: 'admin@yourdomain.com',
    icon: <UserOutlined />,
    avatar: 'https://i.pravatar.cc/150?img=1', // Bạn có thể thay đổi ảnh đại diện
  },
  {
    title: 'Moderator',
    description: 'Reach out to Moderators for community guidelines and support.',
    contact: 'moderator@yourdomain.com',
    icon: <TeamOutlined />,
    avatar: 'https://i.pravatar.cc/150?img=2', // Bạn có thể thay đổi ảnh đại diện
  },
  {
    title: 'Discord Support',
    description: 'For Discord-specific support and assistance.',
    contact: 'discord@yourdomain.com',
    icon: <CustomerServiceOutlined />,
    avatar: 'https://i.pravatar.cc/150?img=3', // Bạn có thể thay đổi ảnh đại diện
  },
];

const Contact = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', color: 'rgb(25, 245, 170)' }}>Contact Us</h1>
      <Row gutter={[16, 16]} justify="center">
        {roles.map((role) => (
          <Col xs={24} sm={12} md={8} key={role.title}>
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
                <Avatar size={64} src={role.avatar} style={{ marginBottom: '10px' }} />
                <div style={{ fontSize: '36px', color: '#1890ff', marginBottom: '15px' }}>
                  {role.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: '20px' }}>{role.title}</h3>
                <p style={{ color: '#888', marginTop: '5px' }}>{role.description}</p>
                <p style={{ color: '#333', fontWeight: 'bold' }}>Email: {role.contact}</p>
              </div>
              <Button type="primary" style={{ marginTop: '10px' }} onClick={() => window.open(`mailto:${role.contact}`, '_blank')}>
                Contact via Email
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Contact;

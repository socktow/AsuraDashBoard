import React from 'react';
import { Card, Col, Row } from 'antd';
import { UserOutlined, CustomerServiceOutlined, TeamOutlined } from '@ant-design/icons';

const Contact = () => {
  const roles = [
    {
      title: 'Admin',
      icon: <UserOutlined />,
      description: 'Contact the Admin for general inquiries and account-related issues.',
      contact: 'admin@yourdomain.com',
    },
    {
      title: 'Moderator',
      icon: <TeamOutlined />,
      description: 'Reach out to Moderators for community guidelines and support.',
      contact: 'moderator@yourdomain.com',
    },
    {
      title: 'Discord Support',
      icon: <CustomerServiceOutlined />,
      description: 'For Discord-specific support and assistance.',
      contact: 'discord@yourdomain.com',
    },
  ];

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Contact Us</h1>
      <Row gutter={[16, 16]} justify="center">
        {roles.map((role) => (
          <Col xs={24} sm={12} md={8} key={role.title}>
            <Card
              title={role.title}
              hoverable
              bordered={false}
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
              }}
              bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}
            >
              <div style={{ fontSize: '36px', color: '#1890ff', marginBottom: '15px' }}>
                {role.icon}
              </div>
              <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>{role.description}</p>
              <p style={{ fontWeight: 'bold', color: '#333' }}>Email: {role.contact}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Contact;

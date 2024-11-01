import React, { useState } from 'react';
import { Card, Col, Row, Typography, Button, Layout } from 'antd';

const { Title, Text } = Typography;
const { Content } = Layout;

const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const coinMultiplier = 10;

  // Denomination options
  const amounts = [
    { value: 20000, label: '20,000 VND' },
    { value: 50000, label: '50,000 VND' },
    { value: 100000, label: '100,000 VND' },
    { value: 200000, label: '200,000 VND' },
    { value: 500000, label: '500,000 VND' },
    { value: 1000000, label: '1,000,000 VND' },
  ];

  // Function to handle amount selection
  const handleSelectAmount = (value) => {
    setSelectedAmount(value);
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Content style={{ padding: '20px' }}>
        <div style={{ display: 'flex', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          {/* Left Section for Denominations */}
          <div style={{ flex: 1 }}>
            <Title level={4}>Chọn Mệnh Giá Nạp Thẻ</Title>
            <Row gutter={[16, 16]}>
              {amounts.map(({ value, label }) => (
                <Col span={8} key={value}>
                  <Card
                    style={{
                      textAlign: 'center',
                      cursor: 'pointer',
                      height: '150px', // Set a fixed height for the cards
                      backgroundColor: selectedAmount === value ? '#e6f7ff' : '#fff',
                      border: selectedAmount === value ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    }}
                    onClick={() => handleSelectAmount(value)}
                  >
                    <Title level={4}>{label}</Title>
                  </Card>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: '20px' }}>
              <Button
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={() => alert(`Nạp thẻ ${selectedAmount} VND qua MoMo`)}
                disabled={!selectedAmount}
              >
                Nạp Thẻ MoMo
              </Button>
              <Button
                type="primary"
                onClick={() => alert(`Nạp thẻ ${selectedAmount} VND qua ZaloPay`)}
                disabled={!selectedAmount}
              >
                Nạp Thẻ ZaloPay
              </Button>
            </div>
          </div>

          {/* Right Section for Coin Information */}
          <div style={{ flex: 1, paddingLeft: '20px' }}>
            <Title level={4}>Thông Tin Giá Nạp</Title>
            {selectedAmount ? (
              <Text>
                {selectedAmount} VND = {selectedAmount * coinMultiplier} Coin
              </Text>
            ) : (
              <Text>Vui lòng chọn mệnh giá để xem thông tin.</Text>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Payment;

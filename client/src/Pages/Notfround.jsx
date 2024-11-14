import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f8f8',
        textAlign: 'center',
        color: '#333',
      }}
    >
      <h1 style={{ fontSize: '100px', fontWeight: 'bold', marginBottom: '20px' }}>404</h1>
      <p style={{ fontSize: '24px', marginBottom: '40px' }}>
        Rất tiếc, trang bạn tìm kiếm không tồn tại!
      </p>
      <img
        src="https://via.placeholder.com/300"
        alt="Not Found"
        style={{ width: '300px', marginBottom: '30px' }}
      />
      <Link to="/">
        <Button type="primary" style={{ padding: '10px 20px', fontSize: '18px' }}>
          Trở về trang chủ
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

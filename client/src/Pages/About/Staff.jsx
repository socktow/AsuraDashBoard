import React from "react";
import { Card, Avatar, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

const staffMembers = [
  {
    nickname: "AsuraMaster",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    nickname: "ModChampion",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    nickname: "SupportGuru",
    role: "Discord Support",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

const Staff = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center", background: "none" }}>
      <h1 style={{ fontSize: "32px", color: "rgb(25, 245, 170)" }}>
        Staff Team
      </h1>
      <h1 style={{ fontSize: "20px", color: "white" }}>
        Major People
      </h1>

      <Row gutter={[16, 16]} justify="center">
        {staffMembers.map((member) => (
          <Col xs={24} sm={12} md={8} key={member.nickname}>
            <Card
              hoverable
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "transparent",
              }}
            >
              <Avatar
                size={100}
                src={member.avatar}
                icon={<UserOutlined />}
                style={{ marginBottom: "15px" }}
              />
              <h3 style={{ margin: 0, fontSize: "24px", color: "white" }}>
                {member.nickname}
              </h3>
              <p style={{ color: "white", marginTop: "5px", fontSize: "18px" }}>
                {member.role}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Staff;

// src/Components/Footer/Footer.js
import React from "react";
import { Layout, Space, Typography } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Link } = Typography;

const CustomFooter = () => {
  return (
    <Footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Copyright Section */}
        <Text className="text-gray-400 text-center md:text-left">
          © 2024 YourCompany. All Rights Reserved.
        </Text>

        {/* Links Section */}
        <Space size="middle" className="text-gray-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
        </Space>

        {/* Social Media Icons */}
        <Space size="middle">
          <Link href="https://facebook.com" target="_blank">
            <FacebookOutlined className="text-2xl text-gray-400 hover:text-white" />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <TwitterOutlined className="text-2xl text-gray-400 hover:text-white" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <InstagramOutlined className="text-2xl text-gray-400 hover:text-white" />
          </Link>
          <Link href="https://github.com" target="_blank">
            <GithubOutlined className="text-2xl text-gray-400 hover:text-white" />
          </Link>
        </Space>
      </div>
    </Footer>
  );
};

export default CustomFooter;

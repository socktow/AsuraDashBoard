// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SmileOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  DownOutlined,
  LoginOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo, logoutUser } from "../../Redux/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const [menuTheme, setMenuTheme] = useState("light");

  useEffect(() => {
    // Gọi API để lấy thông tin người dùng khi tải component
    if (!user && status === "idle") {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, user, status]);

  const changeTheme = (value) => {
    setMenuTheme(value ? "dark" : "light");
  };

  // Dropdown menu for User Info and Guilds
  const userMenu = (
    <Menu>
      <Menu.Item key="userInfo">
        <Link to="/user">
          <InfoCircleOutlined /> User Info
        </Link>
      </Menu.Item>
      <Menu.Item key="guilds">
        <Link to="/guilds">
          <TeamOutlined /> Guilds
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => dispatch(logoutUser())}>
        <LoginOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header
      className={`flex justify-between items-center p-4 fixed top-0 left-0 w-full z-10 ${
        menuTheme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-xl font-bold">
        <Link to="/">Asuna BOT</Link>
      </div>
      <div className="flex items-center">
        <label className="mr-4">
          <input
            type="checkbox"
            onChange={(e) => changeTheme(e.target.checked)}
            className="toggle"
          />
          <span className="ml-2">{menuTheme === "dark" ? "Light" : "Dark"}</span>
        </label>
        <nav className="flex space-x-4">
          {user ? (
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <span className="ml-4 cursor-pointer flex items-center">
                Hi, {user.username}! <DownOutlined className="ml-1" />
              </span>
            </Dropdown>
          ) : (
            <Link to="/login" className="flex items-center">
              <LoginOutlined />
              <span className="ml-1">Login</span>
            </Link>
          )}
          <Link to="/invite" className="flex items-center">
            <PlusOutlined />
            <span className="ml-1">Invite</span>
          </Link>
          <Link to="/discord" className="flex items-center">
            <SmileOutlined />
            <span className="ml-1">Discord</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

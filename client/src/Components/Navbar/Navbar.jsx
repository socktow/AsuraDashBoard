import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu } from "antd";
import {
  SmileOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  DownOutlined,
  LoginOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { logoutUser } from "../../Redux/UserSlice";
import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");

    // Đăng xuất người dùng từ Redux
    dispatch(logoutUser());

    // Chuyển hướng về trang đăng nhập
    window.location.href = "/login";
  };

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
      <Menu.Item key="payment">
        <Link to="/payment">
          <TeamOutlined /> Nạp Thẻ
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LoginOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  // About menu for links like 'Partner', 'Contact', etc.
  const aboutMenu = (
    <Menu>
      <Menu.Item key="partner">
        <Link to="/about/partner">Partner</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/about/contact">Contact</Link>
      </Menu.Item>
      <Menu.Item key="staff">
        <Link to="/about/staff">Staff</Link>
      </Menu.Item>
    </Menu>
  );

  // Misc menu for links like 'Term', 'Privacy', etc.
  const miscMenu = (
    <Menu>
      <Menu.Item key="term">
        <Link to="/misc/term">Term</Link>
      </Menu.Item>
      <Menu.Item key="privacy">
        <Link to="/misc/privacy">Privacy</Link>
      </Menu.Item>
      <Menu.Item key="embedBuilder">
        <Link to="/misc/new-embed-builder">New Embed Builder</Link>
      </Menu.Item>
      <Menu.Item key="placeholder">
        <Link to="/misc/placeholder">Placeholder</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          Asura BOT
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/commands" className="navbar-link">
          Command
        </Link>
        <Link to="/patch-note" className="navbar-link">
          Patch Note
        </Link>
        <Dropdown overlay={aboutMenu} trigger={["click"]}>
          <span className="navbar-dropdown">
            About <DownOutlined />
          </span>
        </Dropdown>
        <Dropdown overlay={miscMenu} trigger={["click"]}>
          <span className="navbar-dropdown">
            Misc <DownOutlined />
          </span>
        </Dropdown>
      </nav>

      <div className="navbar-user">
        {/* If the user is logged in, show the dropdown with user info */}
        {userInfo ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <span className="navbar-dropdown">
              Hi, {userInfo.username}! <DownOutlined />
            </span>
          </Dropdown>
        ) : (
          <Link to="/login" className="navbar-link">
            <LoginOutlined />
            <span className="ml-1">Login</span>
          </Link>
        )}

        {/* Invite and Discord links */}
        <Link to="/invite" className="navbar-link">
          <PlusOutlined />
          <span className="ml-1">Invite</span>
        </Link>
        <Link to="/discord" className="navbar-link">
          <SmileOutlined />
          <span className="ml-1">Discord</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
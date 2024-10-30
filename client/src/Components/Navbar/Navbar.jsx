import React, { useEffect } from "react";
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

  useEffect(() => {
    if (!user && status === "idle") {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, user, status]);

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
    </Menu>
  );

  return (
    <header
      className="flex justify-between items-center p-4 fixed top-0 left-0 w-full z-10 shadow-md text-white bg-[#2f3136]"
      style={{ height: '70px' }}
    >
      <div className="text-xl font-bold">
        <Link to="/" className="text-white">Asura BOT</Link>
      </div>
      
      {/* Left-side navigation links */}
      <nav className="flex space-x-4 text-white">
        <Link to="/" className="text-white">/Command</Link>
        <Link to="/patch-note" className="text-white">/Patch Note</Link>
        <Dropdown overlay={aboutMenu} trigger={["click"]}>
          <span className="cursor-pointer">/About <DownOutlined /></span>
        </Dropdown>
        <Dropdown overlay={miscMenu} trigger={["click"]}>
          <span className="cursor-pointer">/Misc <DownOutlined /></span>
        </Dropdown>
      </nav>

      {/* Right-side user menu and additional links */}
      <div className="flex items-center space-x-6">
        {user ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <span className="ml-4 cursor-pointer flex items-center">
              Hi, {user.username}! <DownOutlined className="ml-1" />
            </span>
          </Dropdown>
        ) : (
          <Link to="/login" className="flex items-center text-white">
            <LoginOutlined />
            <span className="ml-1">Login</span>
          </Link>
        )}
        <Link to="/invite" className="flex items-center text-white">
          <PlusOutlined />
          <span className="ml-1">Invite</span>
        </Link>
        <Link to="/discord" className="flex items-center text-white">
          <SmileOutlined />
          <span className="ml-1">Discord</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [menuTheme, setMenuTheme] = useState('light');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value) => {
    setMenuTheme(value ? 'dark' : 'light');
  };

  return (
    <header
      className={`flex justify-between items-center p-4 fixed top-0 left-0 w-full z-10 ${menuTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
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
          <span className="ml-2">{menuTheme === 'dark' ? 'Light' : 'Dark'}</span>
        </label>
        <nav className="flex space-x-4">
          <Link to="/user" className={`flex items-center ${current === '1' ? 'font-bold' : ''}`} onClick={() => setCurrent('1')}>
            <MailOutlined />
            <span className="ml-1">User Info</span>
          </Link>
          <Link to="/guilds" className={`flex items-center ${current === '2' ? 'font-bold' : ''}`} onClick={() => setCurrent('2')}>
            <UserOutlined />
            <span className="ml-1">Guilds</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

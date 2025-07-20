import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/login';

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sideNavbarToggle = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleProfile = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/user/${userId || "7898"}`);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const onclickOfPopUpOption = (button) => {
    setIsDropdownOpen(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      handleLogout();
    }
  };

  return (
    <div className='navbar'>
      {/* Left Section */}
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarToggle}>
          <MenuIcon sx={{ color: "white" }} />
        </div>

        <Link to="/" className="navbar_youtubeImg">
          <YouTubeIcon sx={{ fontSize: "34px" }} className='navbar_youtubeImage' />
          <div className='navbar_utubeTitle'>YouTube</div>
        </Link>
      </div>

      {/* Middle Section */}
      <div className="navbar-middle">
        <div className='navbar-searchBox'>
          <input
            type='text'
            placeholder='Search'
            className='navbar-searchInput'
          />
          <div className='navbar-searchIconBox'>
            <SearchIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="navbar-mike">
          <KeyboardVoiceIcon sx={{ color: "white", transform: "translateY(3px)" }} />
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right" ref={dropdownRef}>
        <Link to={'757/upload'}>
          <VideoCallIcon sx={{ color: "white", fontSize: 30, cursor: "pointer" }} />
        </Link>

        <NotificationsIcon sx={{ color: "white", fontSize: 30, cursor: "pointer" }} />

        <div className="navbar-profile">
          <img
            src={userPic}
            className='navbar-right-logo'
            alt='User'
            onClick={toggleDropdown}
          />

          {isDropdownOpen && (
            <div className='navbar-modal'>
              <div className='navbar-modal-option' onClick={handleProfile}>Profile</div>
              <div className='navbar-modal-option' onClick={() => onclickOfPopUpOption("logout")}>Logout</div>
              <div className='navbar-modal-option' onClick={() => onclickOfPopUpOption("login")}>Login</div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Custom Login Popup from Login.js */}
      {login && <Login onCancel={() => setLogin(false)} />}
    </div>
  );
};

export default Navbar;

// components/Navbar.jsx
import React from 'react';
import './navbar.css';
import Dropdown from './Dropdown';
import ResourcesDropdown from './ResourcesDropdown';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setCategory }) => {
  const navigate = useNavigate();

  return (
    <div className="NavContainer">
      <nav>
        {/* Logo container at extreme left */}
        <div className="logo-container">
          {/* This div can be replaced with your logo component later */}
          <img src="/chrome_xb1xWiWoWg.png" alt="Logo" style={{width : "9rem"}}/>
        </div>
        
        {/* Navigation items at extreme right */}
        <ul className="nav-links">
          <li>
            <button className="home" onClick={() => {navigate('/'); setCategory("tag1");}}>
              Home
            </button>
          </li>
          <li>
            <ResourcesDropdown setCategory={setCategory} />
          </li>
          <li>
            <button className="admin" onClick={() => navigate('/admin')}>
              Admin
            </button>
          </li>
          <li>
            <button className="postNews" onClick={() => navigate('/post')}>
              Post
            </button>
          </li>
          <li>
            <button className="contact-Us" onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </li>
          <li>
            <Dropdown />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
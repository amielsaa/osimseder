import React from 'react';
import './css/Header.css';
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = ({ userName, role }) => {
  const roleBoxStyle = {
    backgroundColor: role === 'Admin' ? 'red' : '', 
  };

  return (
    <header>
      <div className='logo'>לוגו חברה</div>
      <h1 className='hello'>שלום {userName}</h1>
      <div className='icons'>
      <IoMdSettings className='settings-icon' />
      <Link to="/Personal" className="user-link">
        <FaUser className='user-icon' />
      </Link>
      <div className='role-box' style={roleBoxStyle}>{role}</div>
      </div>
    </header>
  );
};

export default Header;

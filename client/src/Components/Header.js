import React from 'react';
import './css/Header.css';
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import DataContext from '../Helpers/DataContext';
import { useContext } from 'react';

const Header = () => {
  const {user} = useContext(DataContext)
  const roleBoxStyle = {
    backgroundColor: user.role === 'Admin' ? 'red' : '', 
  };

  return (
    <header>
      <div className='logo'>לוגו חברה</div>
      <h1 className='hello'>שלום {user.userName}</h1>
      <div className='icons'>
      <IoMdSettings className='settings-icon' />
      <Link to="/Personal" className="user-link">
        <FaUser className='user-icon' />
      </Link>
      <div className='role-box' style={roleBoxStyle}>{user.role}</div>
      </div>
    </header>
  );
};

export default Header;

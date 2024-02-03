import React from 'react';
import './css/Header.css'
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
const Header = ({userName, role}) => {
  return (
    <header>
        
        <div className='logo'>לוגו חברה</div>
        <h1 className='hello'>שלום {userName}</h1>
        <div className='icons'>
        <IoMdSettings className='settings-icon' />
        <FaUser className='user-icon' />
        <div className='role-box'>{role}</div>
        </div>
      </header>
  );
}

export default Header;
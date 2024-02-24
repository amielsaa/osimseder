import React from 'react';
import './css/Header.css';
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import DataContext from '../Helpers/DataContext';
import { useContext } from 'react';
import Logo from '../images/g_udi_logo.png';  // Fix the import here
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(DataContext);
  const roleBoxStyle = {
    backgroundColor: user.role === 'Admin' ? 'red' : '', 
  };

  return (
    <>
      <header>
        
        <div className='logo'>
        <Link to='/Home'>
          <img src={Logo} alt='לוגו חברה'/>
        </Link>
        </div>
        
        <h1 className='hello'>שלום {user.userName}</h1>
        <div className='role-box' style={roleBoxStyle}>{user.role}</div>
      </header>
    </>
  );
};

export default Header;

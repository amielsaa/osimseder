import React from 'react';
import './css/Header.css';
import DataContext from '../Helpers/DataContext';
import { useState,useEffect,useContext } from 'react';
import Logo from '../images/g_udi_logo.png';  // Fix the import here
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(DataContext);
  const roleBoxStyle = {
    backgroundColor: user.role === 'Admin' ? 'red' : '', 
  };
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    user.role === "Student" ? setUserRole("מתנדב/ת") :
      user.role === "TeamOwner" ? setUserRole("חניכ/ת גרעין") : 
      user.role === "AreaManager" ? setUserRole("רכז/ת גרעין") :
      user.role === "CityManager" ? setUserRole("רכז/ת עיר"):
      user.role === "Admin" ? setUserRole("אדמין") : setUserRole("        ")  ;
  }, [user.role]);

  return (
    <>
      <header>
        
        <div className='logo'>
        <Link to='/Home'>
          <img src={Logo} alt='לוגו חברה'/>
        </Link>
        </div>
        
        <h1 className='hello'>שלום {user.firstName}</h1>
        <div className='role-box' style={roleBoxStyle}>{userRole}</div>
      </header>
    </>
  );
};

export default Header;

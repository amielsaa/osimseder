import React, { useState } from 'react';
import './css/Nav.css';
import { Link } from 'react-router-dom';

const Nav = ({ role }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const closeSidebar = () => {
    setIsSidebarHidden(true);
  };

  return (
    <div className="App">
      <nav className={`${isSidebarHidden ? 'hide' : ''}`}>
        <button id="toggle-btn" onClick={toggleSidebar}>
          <div className="menu-icon"></div>
          <i className="fa fa-bars"></i>
        </button>
        <span className='menu-title'>תפריט</span>
        <ul className="sidebar-menu">
          {role === 'Admin' && (
            <>
              <li onClick={closeSidebar}><Link to="/Groups"><i className="fa fa-home"></i>קבוצות</Link></li>
              <li onClick={closeSidebar}><a href="#"><i className="fa fa-suitcase"></i>בתים</a></li>
              <li onClick={closeSidebar}><a href="#"><i className="fa fa-user"></i>ציוד</a></li>
              <li onClick={closeSidebar}><a href="#"><i className="fa fa-gear"></i>מפה</a></li>
            </>
          )}
          {role === 'Student' && (
            <li onClick={closeSidebar}><a href="#"><i className="fa fa-home"></i>קבוצות</a></li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
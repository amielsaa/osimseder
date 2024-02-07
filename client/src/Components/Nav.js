import React, { useState } from 'react';
import './css/Nav.css';
import { Link } from 'react-router-dom';

const Nav = ({ role }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div className="App">
      <nav className={`${isSidebarHidden ? 'hide' : ''}`}>
        <button id="toggle-btn" onClick={toggleSidebar}>
          <div class="menu-icon"></div>
          <i className="fa fa-bars"></i>
        </button>
        <span className='menu-title'>תפריט</span>
        <ul className="sidebar-menu">
          {role === 'Admin' && (
            <>
              <Link to="/Groups"><li><a href="#"><i className="fa fa-home"></i>קבוצות</a></li></Link>
              <li><a href="#"><i className="fa fa-suitcase"></i>בתים</a></li>
              <li><a href="#"><i className="fa fa-user"></i>ציוד</a></li>
              <li><a href="#"><i className="fa fa-gear"></i>מפה</a></li>
            </>
          )}
          {role === 'Student' && (
            <li><a href="#"><i className="fa fa-home"></i>קבוצות</a></li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
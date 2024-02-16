import React, { useState } from 'react';
import './css/Nav.css';
import { Link } from 'react-router-dom';
import DataContext from '../Helpers/DataContext';
import { useContext } from 'react';

const Nav = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const {user} = useContext(DataContext)

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
        <span className='menu-title'>{user.role} תפריט</span>
        <ul className="sidebar-menu">
          {user.role === 'Admin' && (
            <>
              <li onClick={closeSidebar}><Link to="/Groups"><i className="fa fa-home"></i>קבוצות</Link></li>
              <li onClick={closeSidebar}><a href="#"><i className="fa fa-suitcase"></i>בתים</a></li>
              <li onClick={closeSidebar}><a href="#"><i className="fa fa-user"></i>ציוד</a></li>
              <li onClick={closeSidebar}><a href="#"><i className="fa fa-gear"></i>מפה</a></li>
            </>
          )}
          {user.role === 'Student' && (
            <>
            <li onClick={closeSidebar}><Link to="/Groups"><i className="fa fa-home"></i>קבוצות</Link></li>
            <li onClick={closeSidebar}><Link to="/My-Group"><i className="fa fa-my_group"></i>הקבוצה שלי</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
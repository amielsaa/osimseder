import  { useContext ,useState,useEffect } from 'react';
import './css/Nav.css';
import { Link } from 'react-router-dom';
import DataContext from '../Helpers/DataContext';
import { IoMdArrowRoundBack } from "react-icons/io";


const Nav = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const {user} = useContext(DataContext);
  const [userRole, setUserRole] = useState('');
  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };
  useEffect(() => {
    user.role === "Student" ? setUserRole("סטודנט"): setUserRole("חניך גרעין")
})
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
        <div className='menu-bar-title'>
        <IoMdArrowRoundBack className='close_nav_arrow' onClick={toggleSidebar} />
        <span className='menu-title'> תפריט {userRole}</span>
        </div>
        
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
              <li onClick={closeSidebar}><Link to={`/GroupPage/${user.groupId}`}><i className="fa fa-my_group"></i>הקבוצה שלי</Link></li>
              <li onClick={closeSidebar}><Link to="/Personal"><i className="fa fa-home"></i>פרטים אישיים</Link></li>
              <li onClick={closeSidebar}><Link to={`/`}><i className="fa fa-my_group"></i>התנתקות</Link></li>
            </>
          )}
          {user.role === 'TeamOwner' && (
            <>
            <li onClick={closeSidebar}><Link to="/Groups"><i className="fa fa-home"></i>קבוצות</Link></li>
            <li onClick={closeSidebar}><Link to="/My-Groups"><i className="fa fa-my_group"></i>הקבוצות שלי</Link></li>
            <li onClick={closeSidebar}><Link to="/My-Houses"><i className="fa fa-my_group"></i>הבתים שלי</Link></li>
            <li onClick={closeSidebar}><Link to="/Equipment"><i className="fa fa-my_group"></i>ציוד נדרש</Link></li>
            <li onClick={closeSidebar}><Link to="/Personal"><i className="fa fa-home"></i>פרטים אישיים</Link></li>
            <li onClick={closeSidebar}><Link to={`/`}><i className="fa fa-my_group"></i>התנתקות</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
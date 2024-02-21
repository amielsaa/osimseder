import  { useContext ,useState,useEffect } from 'react';
import './css/Nav.css';
import { Link } from 'react-router-dom';
import DataContext from '../Helpers/DataContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { MdOutlineGroups3 } from "react-icons/md";
import { BsHouses } from "react-icons/bs";
import { BsTools } from "react-icons/bs";
import { FaInfo } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import { MdGroup } from "react-icons/md";

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
              <li onClick={closeSidebar}><Link to="/Groups"><i className="fa fa-home"></i> <MdGroups className='nav_icon'/> קבוצות </Link></li>
              <li onClick={closeSidebar}><Link to={`/GroupPage/${user.groupId}`}><i className="fa fa-my_group"></i> <MdGroup className='nav_icon'/>הקבוצה שלי</Link></li>
              <li onClick={closeSidebar}><Link to="/Personal"><i className="fa fa-home"></i> <FaInfo className='nav_icon'/>פרטים אישיים </Link></li>
              <li onClick={closeSidebar}><Link to={`/`}><i className="fa fa-my_group"></i> <FaDoorOpen className='nav_icon'  />התנתק/י </Link></li>
            </>
          )}
          {user.role === 'TeamOwner' && (
            <>
            <li onClick={closeSidebar}><Link to="/Groups"><i className="fa fa-home"></i><MdGroups className='nav_icon'/> קבוצות </Link></li>
            <li onClick={closeSidebar}><Link to="/My-Groups"><i className="fa fa-my_group"></i> <MdOutlineGroups3 className='nav_icon'/>הקבוצות שלי </Link></li>
            <li onClick={closeSidebar}><Link to="/My-Houses"><i className="fa fa-my_group"></i> <BsHouses className='nav_icon'/>הבתים שלי </Link></li>
            <li onClick={closeSidebar}><Link to="/Equipment"><i className="fa fa-my_group"></i> <BsTools className='nav_icon'/>ציוד נדרש </Link></li>
            <li onClick={closeSidebar}><Link to="/Personal"><i className="fa fa-home"></i><FaInfo className='nav_icon'/>פרטים אישיים</Link></li>
            <li onClick={closeSidebar}><Link to={`/`}><i className="fa fa-my_group"></i> <FaDoorOpen className='nav_icon'  />התנתק/י</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
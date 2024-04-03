import { useContext, useState, useEffect } from 'react';
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
import ConfirmationMessage from './ConfirmationMessage';

const Nav = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const { user,navigate } = useContext(DataContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [studentGroup,setStudentGroup] = useState('')

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const closeSidebar = () => {
    setIsSidebarHidden(true);
  };
  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      localStorage.removeItem("accessToken");
      navigate("/");
    }
    setShowConfirmation(false);
  };
  useEffect(() => {
    if (user.role === "Student" && user.groupId !== undefined)
    {
      setStudentGroup(user.groupId)
    }

  })

  useEffect(() => {
    user.role === "Student" ? setUserRole("מתנדב/ת") :
      user.role === "TeamOwner" ? setUserRole("חניכ/ת גרעין") : 
      user.role === "AreaManager" ? setUserRole("רכז/ת גרעין") :
      user.role === "CityManager" ? setUserRole("רכז/ת עיר"):
      setUserRole("אדמין")  ;
  }, [user.role]);

  return (
    <div className="App">
      <nav className={`${isSidebarHidden ? 'hide' : ''}`}>
        <button id="toggle-btn" onClick={toggleSidebar}>
          <div className="menu-icon"></div>
          <i className="fa fa-bars"></i>
        </button>
        <div className='menu-bar-title'  >
        <IoMdArrowRoundBack 
                    className={`${
                    !isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'
                    } close_nav_arrow`}
                    onClick={toggleSidebar}
                    />
          <span className={`menu-title ${!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}`}> תפריט {userRole}</span>
        </div>

        <ul className="sidebar-menu">
          {user.role === 'Admin' && (
            <>
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/My-Groups"><i className="fa fa-my_group"></i> <MdOutlineGroups3 className='nav_icon'/>כל הקבוצות</Link></li>
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/My-Houses"><i className="fa fa-my_group"></i> <BsHouses className='nav_icon'/> כל הבתים</Link></li>
              {/*<li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/Equipment"><i className="fa fa-my_group"></i> <BsTools className='nav_icon'/>ציוד נדרש </Link></li>*/}
              <li onClick={() => {setShowConfirmation(true)}} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><i className="fa fa-my_group"></i> <FaDoorOpen className='nav_icon' />התנתק/י</li>
            </>
          )}
          {user.role === 'Student' && (
            <>
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/Groups"><i className="fa fa-home"></i> <MdGroups className='nav_icon'/> קבוצות </Link></li>
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to={studentGroup? `/GroupPage/${user.groupId}` : `/GroupPage/-1`}><i className="fa fa-my_group"></i> <MdGroup className='nav_icon'/>הקבוצה שלי</Link></li>
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to={`/Personal/${user.encryptedEmail}`}><i className="fa fa-home"></i> <FaInfo className='nav_icon'/>פרטים אישיים </Link></li>
              <li onClick={() => {setShowConfirmation(true)}} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><i className="fa fa-my_group"></i> <FaDoorOpen className='nav_icon' />התנתק/י </li>
            </>
          )}
          {user.role === 'TeamOwner' && (
            <>
              {/*<li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/My-Groups"><i className="fa fa-my_group"></i> <MdOutlineGroups3 className='nav_icon'/>הקבוצות שלי </Link></li>*/}
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/My-Houses"><i className="fa fa-my_group"></i> <BsHouses className='nav_icon'/>הבתים שלי </Link></li>
               {/*<li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/Equipment"><i className="fa fa-my_group"></i> <BsTools className='nav_icon'/>ציוד נדרש </Link></li>*/}
               <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to={`/Personal/${user.encryptedEmail}`}><i className="fa fa-home"></i> <FaInfo className='nav_icon'/>פרטים אישיים </Link></li>
              <li onClick={() => {setShowConfirmation(true)}} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><i className="fa fa-my_group"></i> <FaDoorOpen className='nav_icon' />התנתק/י</li>
            </>
          )}
          {(user.role === 'AreaManager' || user.role === 'CityManager') && (
            <>
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/My-Groups"><i className="fa fa-my_group"></i> <MdOutlineGroups3 className='nav_icon'/>קבוצות</Link></li>
              <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/My-Houses"><i className="fa fa-my_group"></i> <BsHouses className='nav_icon'/>בתים</Link></li>
               {/*<li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to="/Equipment"><i className="fa fa-my_group"></i> <BsTools className='nav_icon'/>ציוד נדרש </Link></li>*/}
               <li onClick={closeSidebar} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><Link to={`/Personal/${user.encryptedEmail}`}><i className="fa fa-home"></i> <FaInfo className='nav_icon'/>פרטים אישיים </Link></li>
              <li onClick={() => {setShowConfirmation(true)}} className={!isSidebarHidden ? 'appear-from-top' : 'disappear-from-top'}><i className="fa fa-my_group"></i> <FaDoorOpen className='nav_icon' />התנתק/י</li>
            </>
          )}
        </ul>




      </nav>
      
      {showConfirmation && !isSidebarHidden &&  (
        <ConfirmationMessage confirmationMessage={"האם את/ה בטוח/ה שברצונך להתנתק?"}
                              handleConfirmation={handleConfirmation}
                              setShowConfirmation={setShowConfirmation}/>
      )}
    </div>
  );

  
};

export default Nav;

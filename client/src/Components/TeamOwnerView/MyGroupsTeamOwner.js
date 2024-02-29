import '../css/Groups.css'
import Nav from '../Nav';
import Header from '../Header';
import GroupListTO from './GroupListTO'
import { useContext } from 'react';
import DataContext from '../../Helpers/DataContext';
import Footer from '../Footer';

const MyGroupsTeamOwner = () => {
  const {user, navigate} = useContext(DataContext);
  return (
    <>
    <Header/>
      <Nav/>
    <div className='content-Box'>
      <div className='To_main_content_groups'>
        <div className='groups_title'>
        {user.role === "TeamOwner" && (
             <h1>הקבוצות שלי</h1>
          )}
          {(user.role === "AreaManager" || user.role === "CityManager"  ) && (
             <h1>קבוצות באיזורי</h1>
          )}
      </div>
      <GroupListTO/>
      
    </div>
    {(user.role === "AreaManager" || user.role === "CityManager"  ) && (
          <button className='add_group_btn' onClick={() => navigate('/addGroup')}>הוסף קבוצה</button>
    )}
    </div> 
    <Footer/>
    </>
  )
}

export default MyGroupsTeamOwner;
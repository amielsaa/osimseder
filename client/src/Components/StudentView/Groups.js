import '../css/Groups.css'
import Nav from '../Nav';
import Header from '../Header';
import GroupList from './GroupList';
import { useContext, useEffect } from 'react';
import DataContext from '../../Helpers/DataContext';
import Footer from '../Footer';

const Groups = () => {
  const {user, navigate} = useContext(DataContext);
  useEffect(() => {
    if(!(localStorage.getItem("accessToken"))){
      navigate('/404')
    }
  })
  
  return (
    <>
    <Header/>
      <Nav/>
    <div className='content-Box'>
    <div className='groups_title'>
      <h1>אנא בחר קבוצה</h1>
      </div>
      <div className='groups_main_content'>
        
      {user.groupId && (
         <div className='groups_semi_title'>
         <h2>הינך נמצא בקבוצה {user.groupId} כרגע</h2>
       </div>
      )}
       
      <GroupList/>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Groups;
import '../css/Groups.css'
import Nav from '../Nav';
import Header from '../Header';
import GroupList from './GroupList';
import { useContext } from 'react';
import DataContext from '../../Helpers/DataContext';
import Footer from '../Footer';

const Groups = () => {
  const {user} = useContext(DataContext);
  return (
    <>
    <Header/>
      <Nav/>
    <div className='content-Box'>
      <h1 className='title'>אנא בחר קבוצה</h1>
      {user.role === "Student"  ? <h2 className='sub-title'>.שים לב! לאחר בחירת קבוצה לא ניתן לשנות</h2> : ""}
      <GroupList/>
    </div>
    <Footer/>
    </>
  )
}

export default Groups;
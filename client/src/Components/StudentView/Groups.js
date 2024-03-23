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
      <div className='groups_main_content'>
        <div className='groups_title'>
      <h1>אנא בחר קבוצה</h1>
      </div>
      <GroupList/>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Groups;
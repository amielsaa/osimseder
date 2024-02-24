import '../css/Groups.css'
import Nav from '../Nav';
import Header from '../Header';
import GroupListTO from './GroupListTO'
import { useContext } from 'react';
import DataContext from '../../Helpers/DataContext';
import Footer from '../Footer';

const MyGroupsTeamOwner = () => {
  const {user} = useContext(DataContext);
  return (
    <>
    <Header/>
      <Nav/>
    <div className='content-Box'>
      <div className='To_main_content_groups'>
        <div className='groups_title'>
      <h1>הקבוצות שלי</h1>
      </div>
      <GroupListTO/>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default MyGroupsTeamOwner;
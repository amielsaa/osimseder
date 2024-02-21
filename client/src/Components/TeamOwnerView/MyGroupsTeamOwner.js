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
      <h1 className='title'>הקבוצות שלי</h1>
      <GroupListTO/>
    </div>
    <Footer/>
    </>
  )
}

export default MyGroupsTeamOwner;
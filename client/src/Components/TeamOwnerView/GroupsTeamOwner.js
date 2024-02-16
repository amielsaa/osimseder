import '../css/Groups.css'
import Nav from '../Nav';
import Header from '../Header';
import GroupList from '../StudentView/GroupList';

const Groups = () => {

  return (
    <>
    <Header/>
      <Nav/>
    <div className='content-Box'>
      <h1 className='title'> בחר קבוצות</h1>
      <GroupList/>
    </div>
    </>
  )
}

export default Groups;
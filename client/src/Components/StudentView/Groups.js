import '../css/Groups.css'
import Nav from '../Nav';
import Header from '../Header';
import GroupList from './GroupList';
const Groups = ({userName, role}) => {
  return (
    <>
    <Header userName={userName}  role={role}/>
      <Nav role={role}/>
    <div className='content-Box'>
      <h1 className='title'>אנא בחר קבוצה</h1>
      <h2 className='sub-title'>.שים לב! לאחר בחירת קבוצה לא ניתן לשנות</h2>
      <GroupList/>
    </div>
    </>
  )
}

export default Groups;
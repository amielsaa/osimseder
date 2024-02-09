import './css/Groups.css'
import Nav from './Nav';
import Header from './Header';
import GroupList from './GroupList';
const Groups = ({userName, role}) => {
  return (
    <>
    <Header userName={userName}  role={role}/>
    {role === 'Admin' && (
      <Nav role={role}/>
    )}
    <div className='content-Box'>
      <GroupList/>
    </div>
    </>
  )
}

export default Groups;
import './css/Groups.css'
import Nav from './Nav';
import Header from './Header';
const Groups = ({userName, role}) => {
  return (
    <>
    <Header userName={userName}  role={role}/>
    <Nav role={role}/>
    <div className='content-Box'>
      <h1>עמוד הקבוצות</h1>
    </div>
    </>
  )
}

export default Groups;
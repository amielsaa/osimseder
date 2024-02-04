import './css/Home.css'
import Header from './Header'
import Nav from './Nav'
const Home = ({role, userName}) => {
  return (
    <>
    <Header userName={userName}  role={role}/>
    <Nav role={role}/>
    <div className='content-Box'>
        <h1>עמוד הבית</h1>
    </div>
    </>
  )
}

export default Home;
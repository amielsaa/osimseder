import './css/Home.css'
import Header from './Header'
import Nav from './Nav'
const Home = ({role, userName}) => {
  return (
    <>
    <Header userName={userName}  role={role}/>

    <Nav role={role}/>
    
    <div className='content-Box-Home'>
        <h1>עושים סדר</h1>
        <h1>ברוכים הבאים לעושים סדר, פרוייקט הנדסת תוכנה שנה ד ע"י ארי מאיר יואב אביטל עמיאל סעד ופליקס רויזמן</h1>
    </div>
    </>
  )
}

export default Home;
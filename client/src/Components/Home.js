import './css/Home.css'
import Header from './Header'
import Nav from './Nav'
import DataContext from '../Helpers/DataContext';
import { useContext } from 'react';
import Footer from './Footer';
const Home = () => {
  const {user} = useContext(DataContext)
  return (
    <>
    <Header/>

    <Nav/>
    
    <div className='content-Box-Home'>
        <h1>עושים סדר</h1>
        <h1>ברוכים הבאים לעושים סדר, פרוייקט הנדסת תוכנה שנה ד ע"י ארי מאיר יואב אביטל עמיאל סעד ופליקס רויזמן</h1>
    </div>
    <Footer/>
    </>
  )
}

export default Home;
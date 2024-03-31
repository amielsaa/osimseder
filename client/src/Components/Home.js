import './css/Home.css'
import Header from './Header'
import Nav from './Nav'
import DataContext from '../Helpers/DataContext';
import { useContext, useEffect, useState } from 'react';
import Footer from './Footer';
const Home = () => {
  
  const {user,navigate, loginRefresh, setLoginRefresh} = useContext(DataContext)
  useEffect(() => {
    if(!(localStorage.getItem("accessToken"))){
      navigate('/404')
    }
  })
  useEffect(() => {
    if(loginRefresh) {
      setLoginRefresh(false);
      window.location.reload();
    }

  },[])
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
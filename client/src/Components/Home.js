import './css/Home.css';
import Header from './Header';
import Nav from './Nav';
import DataContext from '../Helpers/DataContext';
import { useContext, useEffect, useState } from 'react';
import Footer from './Footer';
import useWindowEvents from '../Helpers/useWindowEvents';
import video_pc_res from '../images/pc_res_video.mp4';
import video_phone_res from '../images/phone_res_video.mp4';

const Home = () => {
  const { user, navigate, loginRefresh, setLoginRefresh, } = useContext(DataContext);

  const windowSize = useWindowEvents()
  useEffect(() => {
    if (!(localStorage.getItem("accessToken"))) {
      navigate('/404');
    }
  }, []);

  useEffect(() => {}
,[window.width])

  useEffect(() => {
    if (loginRefresh) {
      setLoginRefresh(false);
      window.location.reload();
      
    }
  }, []);
  useEffect(() => {
    
  }, []);

  return (
    <>
      <Header />
      <Nav />
      
      <div className='content-Box-Home'>
        

      
        <video autoPlay loop muted>
          
          <source src={windowSize.width >= 768? video_pc_res : video_phone_res} type="video/mp4" />
          
          Your browser does not support the video tag.
        </video>
        <div className='giant_title'>
           !ברוכים הבאים 
        </div>
        <div className='giant_semi_title'>
           לפרוייקט עושים סדר
        </div>
        <div className='giant_semi_semi_title'>
           תודה על ההשתתפות {user.firstName}
        </div>
       
      </div>
      <Footer/>

      
    </> 
  );
};

export default Home;

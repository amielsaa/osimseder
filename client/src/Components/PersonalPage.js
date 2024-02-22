import './css/PersonalPage.css'
import Header from './Header';
import Nav from './Nav';
import { IoMdCreate, IoMdLock } from 'react-icons/io';
import { IoChevronForwardCircle } from "react-icons/io5";
import DataContext from '../Helpers/DataContext';
import { useContext } from 'react';
import Footer from './Footer';
const PersonalPage = () => {
  const {user, navigate} = useContext(DataContext)

  
  return (
    <>
    <Header/>
    <Nav/>
    <div className='content-Box'>
    <span className='purple_circle'>
      <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
      </span>
    <div className='Personal-Title'>
      <h1>פרטים אישיים</h1>
        </div>
        <div className='Personal-Info'>
        <div className='Info'>שם פרטי: {user.userName}</div>
        <div className='Info'>מספר פלאפון: {user.phoneNumber}</div>
        
        <div className='Info'>שם הורה: {user.parentName}</div>
        <div className='Info'>מספר פלאפון הורה: {user.parentNumber}</div>
  
        <div className='Info'>בית ספר: {user.School}</div>
        <div className='Info'>מין: {user.sex}</div>
        <div className='Info'>שפות: {user.languages.join(', ')}</div>
        <div className='Info'>בקשות אישיות: {user.personalRequests}</div>
        </div>
         
        <div className='ActionButtonsContainer'>
          <button className='ActionButton'>
          <IoMdCreate className='ActionIcon' /> ערוך
          </button>

          <button className='ActionButton'>
          <IoMdLock className='ActionIcon' /> שנה סיסמה
          </button>
        </div>     
    </div>
    <Footer/>
    </>
  )
}

export default PersonalPage;
import './css/PersonalPage.css'
import Header from './Header';
import Nav from './Nav';
import { IoMdCreate, IoMdLock } from 'react-icons/io';
import { IoChevronForwardCircle } from "react-icons/io5";
import DataContext from '../Helpers/DataContext';
import { useContext,useState,useEffect } from 'react';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { decryptEmail, getUserByEmail } from '../Helpers/utils'

const PersonalPage = () => {
  const { encryptedEmail } = useParams();
  const { navigate } = useContext(DataContext);
  const [user, setUser] = useState({});

  const encryptedEmailToDecryptedEmail = async () => {
    const decryptedEmail = await decryptEmail(encryptedEmail);
    console.log(decryptedEmail)
    const getuserInfo = await getUserByEmail(decryptEmail);
    console.log(getuserInfo)
  }


  const [userRole, setUserRole] = useState('');
  useEffect(() => {
      user.role === "Student" ? setUserRole("חניך") :
      user.role === "TeamOwner" ? setUserRole("חניך גרעין") : 
      user.role === "AreaManager" ? setUserRole("רכז גרעין") :
      user.role === "CityManager" ? setUserRole("רכז עירוני"):
      user.role === "Admin" ? setUserRole("אדמין") : setUserRole("")  ;
  }, [user.role]);


  return (
    <>
      <Header />
      <Nav />

      <div className='content-Box'>
        <span className='purple_circle'>
          <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
        </span>
        <div className='personal_page_main_content'>





          <div className='Personal-Title'> 
            <h1>פרטים אישיים</h1>
          </div>
          <div className='Personal-Info'>
            
            
            {user.role === "Student" &&
              <>
                <div className='Info'>שם: {user.firstName +" " + user.lastName}</div>
                <div className='Info'>תפקיד: {userRole}</div>
                <div className='Info'>מספר פלאפון: {user.phoneNumber}</div>
                <div className='Info'>שם הורה: {user.parentName}</div>
                <div className='Info'>מספר פלאפון הורה: {user.parentPhoneNumber}</div>
                <div className='Info'>עיר: {user.cityName}</div>
                <div className='Info'>בית ספר: {user.schoolName}</div>
                <div className='Info'>מין: {user.gender}</div>
                <div className='Info'>שפה נוספת: {user.extraLanguage}</div>
                <div className='Info'>בקשות אישיות: {user.issuesText}</div>
              </>
            }
            
          
          {user.role !== "Student" &&
              <>
                <div className='Info'>שם: {user.firstName +" " + user.lastName}</div>
                <div className='Info'>תפקיד: {userRole}</div>
                <div className='Info'>עיר: {user.cityName}</div>
                <div className='Info'>מספר פלאפון: {user.phoneNumber}</div>
                <div className='Info'>מין: {user.gender}</div>
              </>
            }

          </div>
        </div>
        <div className='ActionButtonsContainer'>
            <button className='ActionButton' onClick={() => encryptedEmailToDecryptedEmail()}>
              <IoMdCreate className='ActionIcon' /> ערוך
            </button>

            <button className='ActionButton'>
              <IoMdLock className='ActionIcon' /> שנה סיסמה
            </button>
          </div>    












      </div>
      <Footer />
    </>
  );
}

export default PersonalPage;

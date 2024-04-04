import './css/PersonalPage.css'
import Header from './Header';
import Nav from './Nav';
import { IoMdCreate, IoMdLock } from 'react-icons/io';
import { IoChevronForwardCircle } from "react-icons/io5";
import DataContext from '../Helpers/DataContext';
import { useContext, useState, useEffect } from 'react';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { decryptEmail, getUserByEmail } from '../Helpers/utils';

const PersonalPage = () => {
  const { encryptedEmail } = useParams();
  const { navigate,user } = useContext(DataContext);
  const [centerUser, setCenterUser] = useState({});
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCenterUser,setIsCenterUser] = useState(false)

  const encryptedEmailToUser = async () => {
    const decryptedEmail = await decryptEmail(encryptedEmail);
    const userInfo = await getUserByEmail(decryptedEmail);
    return userInfo;
  }

  const checkIfUserIsCenterUser = async (tmpUser) => {
    setIsCenterUser(((tmpUser.email === user.email) || user.role !== "Student"))
  }
  useEffect(() => {
    const setUpPage = async () => {
      const tmpUser = await encryptedEmailToUser(encryptedEmail);
      setCenterUser(tmpUser);
      await SettingForRole(tmpUser);
      await checkIfUserIsCenterUser(tmpUser)
      setIsLoading(false); // Set loading to false once user data is fetched
      
    };
    setUpPage();
  }, [encryptedEmail]); 

  const SettingForRole = async (tmpUser) => {
    tmpUser.role === "Student" ? setUserRole("מתנדב/ת") :
    tmpUser.role === "TeamOwner" ? setUserRole("חניכ/ת גרעין") : 
    tmpUser.role === "AreaManager" ? setUserRole("רכז/ת גרעין") :
    tmpUser.role === "CityManager" ? setUserRole("רכז/ת עיר"):
    tmpUser.role === "Admin" ? setUserRole("אדמין"): setUserRole("")  ;
  }

  return (
    <>
      <Header />
      <Nav />
  
      <div className='content-Box'>
        <span className='purple_circle'>
          <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
        </span>
        <div className='Personal-Title'> 
          <h1>פרטים אישיים</h1>
        </div>
        <div className='personal_page_main_content'>
          {!isLoading && (
            <div className='Personal-Info'>
              {centerUser.role === "Student" ? (
                <>
                  <div className='Info'>שם: {centerUser.firstName} {centerUser.lastName}</div>
                  <div className='Info'>תפקיד: {userRole}</div>
                  <div className='Info'>מספר פלאפון: {centerUser.phoneNumber}</div>
  
                  {isCenterUser && (
                    <>
                      <div className='Info'>שם הורה: {centerUser.parentName}</div>
                      <div className='Info'>מספר פלאפון הורה: {centerUser.parentPhoneNumber}</div>
                      <div className='Info'>עיר: {centerUser.cityName}</div>
                      <div className='Info'>בית ספר: {centerUser.schoolName}</div>
                      <div className='Info'>מין: {centerUser.gender}</div>
                      <div className='Info'>שפה נוספת: {centerUser.extraLanguage}</div>
                      <div className='Info'>בקשות אישיות: {centerUser.issuesText}</div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className='Info'>שם: {centerUser.firstName} {centerUser.lastName}</div>
                  <div className='Info'>תפקיד: {userRole}</div>
                  <div className='Info'>עיר: {centerUser.cityName}</div>
                  <div className='Info'>מספר פלאפון: {centerUser.phoneNumber}</div>
                  <div className='Info'>מין: {centerUser.gender}</div>
                </>
              )}
            </div>
          )}
        </div>
        <div className='ActionButtonsContainer'>
          <button className='ActionButton' >
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

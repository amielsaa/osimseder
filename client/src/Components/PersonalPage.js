import './css/PersonalPage.css'
import Header from './Header';
import Nav from './Nav';
import { IoMdCreate, IoMdLock } from 'react-icons/io';
import DataContext from '../Helpers/DataContext';
import { useContext, useState, useEffect } from 'react';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { decryptEmail, getUserByEmail, changeUserPassword } from '../Helpers/utils';
import ConfirmMessage from './ConfirmMessage';
import PasswordChanger from './PasswordChanger';

const PersonalPage = () => {
  const { encryptedEmail } = useParams();
  const { navigate,user,width } = useContext(DataContext);
  const [showPasswordChangePopUp, setShowPasswordChangePopUp] = useState(false)
  const [centerUser, setCenterUser] = useState({});
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCenterUser,setIsCenterUser] = useState(false)
  const [errorConfirm, setErrorConfirm] = useState(false);
  const [successConfirm, setSuccessConfirm] = useState(false);

  const encryptedEmailToUser = async () => {
    const decryptedEmail = await decryptEmail(encryptedEmail);
    const userInfo = await getUserByEmail(decryptedEmail);
    return userInfo;
  }
  
  

  function openPasswordChangeWindow() {
    setShowPasswordChangePopUp(true)
  }
  function closePasswordChangeWindow() {
    setShowPasswordChangePopUp(false)
  }
  async function submitPasswordChange(data) {
    try {
      // Yoav - in the data here you have all the data, recent password - new password and confirmation of new password. (you have print here to see how it looks like)
      // you need to check if the password of the user matches the old password, if so check if the new password and the confirmation of
      // the new password match, if so, change the user password in the back.

      await changeUserPassword(data) //  <--- create this function, ive made the template for you already.
      console.log(data)
      closePasswordChangeWindow()
      setSuccessConfirm(true)
    } catch (e) {
      setErrorConfirm(true)
    }
    
    
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
          <button className='back_button' onClick={() => navigate(-1)} >חזרה</button>
        </span>
         
        
        <div className='Personal-Title'> 
          <h1>פרטים אישיים</h1>
        </div>
        <div className='personal_page_main_content'>
          {!isLoading && (
            <div className='Personal-Info'>
              {centerUser.role === "Student" ? (
                <>
                  <div className='Info-bar'>שם:<span className='black-color'>{centerUser.firstName} {centerUser.lastName}</span> </div>
                  <div className='Info-bar'>תפקיד: <span className='black-color'> {userRole} </span></div>
                  <div className='Info-bar'>מספר פלאפון: <span className='black-color'> {centerUser.phoneNumber} </span></div>
  
                  {isCenterUser && (
                    <>
                      <div className='Info-bar'>שם הורה:<span className='black-color'>  {centerUser.parentName}</span></div>
                      <div className='Info-bar'>מספר פלאפון הורה: <span className='black-color'> {centerUser.parentPhoneNumber} </span></div>
                      <div className='Info-bar'>עיר: <span className='black-color'> {centerUser.cityName} </span></div>
                      <div className='Info-bar'>בית ספר: <span className='black-color'> {centerUser.schoolName} </span></div>
                      <div className='Info-bar'>מין: <span className='black-color'> {centerUser.gender} </span></div>
                      <div className='Info-bar'>שפה נוספת: <span className='black-color'> {centerUser.extraLanguage} </span></div>
                      <div className='Info-bar'>בקשות אישיות: <span className='black-color'> {centerUser.issuesText} </span></div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className='Info-bar' >שם:<span className='black-color'>  {centerUser.firstName} {centerUser.lastName} </span></div>
                  <div className='Info-bar'>תפקיד:<span className='black-color'>  {userRole} </span></div>
                  <div className='Info-bar'>עיר:<span className='black-color'>  {centerUser.cityName} </span></div>
                  <div className='Info-bar'>מספר פלאפון:<span className='black-color'>  {centerUser.phoneNumber} </span></div>
                  <div className='Info-bar'>מין:<span className='black-color'>  {centerUser.gender} </span></div>
                </>
              )}
            </div>
          )}
        </div>
       { user && (centerUser.email === user.email) && <div className='ActionButtonsContainer'>
          <button className='ActionButton' >
            <IoMdCreate className='ActionIcon' /> ערוך
          </button>
          <button className='ActionButton'  onClick={() => openPasswordChangeWindow()}>
            <IoMdLock className='ActionIcon'/> שנה סיסמה
          </button>
        </div>}
      </div>


      { showPasswordChangePopUp &&
       <PasswordChanger onClose={() => setShowPasswordChangePopUp(false)} onSubmit={submitPasswordChange}/>
      }
      {errorConfirm && (
        <ConfirmMessage
          confirmationMessage={`שינוי הסיסמה לא הצליח`}
          handleConfirm={() => setErrorConfirm(false)}
        />
      )}
      {successConfirm && (
        <ConfirmMessage
          confirmationMessage={`הסיסמה שונתה בהצלחה!`}
          handleConfirm={() => setSuccessConfirm(false)}
        />
      )}


      <Footer />
    </>
  );
}

export default PersonalPage;

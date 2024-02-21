import './css/PersonalPage.css'
import Header from './Header';
import Nav from './Nav';
import { useState } from 'react';
import Footer from './Footer';
import { AiOutlineUpload } from 'react-icons/ai';
import { IoMdCreate, IoMdLock } from 'react-icons/io';
import DataContext from '../Helpers/DataContext';
import { useContext } from 'react';
const PersonalPage = () => {
  const {user} = useContext(DataContext)
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    // Amiel - picutre logic is here !!

    try {
      // Replace 'your-upload-endpoint' with the actual endpoint where your server handles file uploads
      const response = await fetch('your-upload-endpoint', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.json(); // Assuming server sends back the URL of the uploaded image
        setImageSrc(imageUrl);
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error during file upload', error);
    }
  };
  return (
    <>
    <Header/>
    <Nav/>
    <div className='content-Box'>
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
          {/* Edit button with pen icon */}
          <button className='ActionButton'>
          <IoMdCreate className='ActionIcon' /> ערוך
          </button>

          {/* Change password button with lock icon */}
          <button className='ActionButton'>
          <IoMdLock className='ActionIcon' /> שנה סיסמה
          </button>
        </div>     
    </div>
    
    </>
  )
}

export default PersonalPage;
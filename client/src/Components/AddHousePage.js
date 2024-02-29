import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import './css/AddHousePage.css';
import Nav from "./Nav";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DataContext from "../Helpers/DataContext";
import Footer from "./Footer";
import { IoChevronForwardCircle } from "react-icons/io5";
import {fetchAllSchoolsByCity, addGroup} from '../Helpers/StaffFrontLogic'

const AddHousePage = () => {
    const { user, navigate } = useContext(DataContext);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSchool, setSelectedSchool] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [address, setAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [language, setLanguage] = useState('');
    const [rooms, setRooms] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [comments, setComments] = useState('');
    const [schoolsList, setSchoolsList] = useState(['נתיבי עם']);
    const [neighborhoodsList, setNeighborhoodsList] = useState(['שכונה א', 'שכונה ב']);
    const languages = ["ערבית","ספרדית","אמהרית","רוסית"]
    const [formSubmitted, setFormSubmitted] = useState(false);

  const initialValues = {
    city: '',
    neighborhood: '',
    address: '',
    firstName: '',
    lastName: '',
    gender: '',
    language: '',
    rooms: '',
    teamSize: '',
    comments: ''
  };

  const validationSchema = Yup.object().shape({
    city: Yup.string().required('עיר נדרשת'),
    neighborhood: Yup.string().required('שכונה נדרשת'),
    address: Yup.string().required('כתובת נדרשת'),
    firstName: Yup.string().required('שם פרטי נדרש'),
    lastName: Yup.string().required('שם משפחה נדרש'),
    gender: Yup.string().required('מין נדרש'),
    language: Yup.string(),
    rooms: Yup.string().required('מספר חדרים נדרש'),
    teamSize: Yup.string().required('גודל קבוצה נדרש'),
    comments: Yup.string()
  });

  const onSubmit = () => {
  // Amiel - all the data you need are in the useStates. after you do whatever you need to do with the data
  // navigate back to "/My-Houses".
  // dont forget! after you place a city you need to give me all the neighborhoods. like in group page in school
  // the page works ! but the yup does problems with his warnings
  console.log(selectedCity)
  };


  return (
    <>
      <Header />
      <Nav />
      <div className='content-Box-add-House'>
        <span className='purple_circle'>
          <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
        </span>
        <div className="main_content_add_House">

          <div className='add-group-title'>
            <h1>הוספת בית</h1>
          </div>
          <div className='Info'>חבר גרעין אחראי : {user.userName}</div>
          <div className='add-group-title'>
            <h2>אנא מלא את הפרטים : </h2>
          </div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>

              <div>
                <label htmlFor="city"> עיר: </label>
                <Field as="select" id="city" name="city" onChange={(e) => {setSelectedCity(e.target.value)}} value={selectedCity}>
                  <option value="">בחר עיר</option>
                  <option value="JRS">ירושלים</option>
                  <option value="BSV">באר שבע</option>
                </Field>
                <ErrorMessage name="city" component="span" />
              </div>


              {selectedCity && (
                <div>
                    <label htmlFor="neighborhood"> שכונה: </label>
                    <Field as="select" id="neighborhood" name="neighborhood" onChange={(e) => setSelectedNeighborhood(e.target.value)} value={selectedNeighborhood}>
                    <option value="">בחר שכונה</option>
                    {neighborhoodsList && (
                        <>
                        {neighborhoodsList.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                            </option>
                        ))}
                        </>
                    )}
                    </Field>
                    <ErrorMessage name="neighborhood" component="span" />
                </div>
                )}

              {(selectedCity && selectedNeighborhood) && (
               <>
                    <div>
                        <label htmlFor="address">כתובת :</label>
                        <Field id="address" name="address" placeholder="כתובת" onChange={(e) => {setAddress(e.target.value)}} value={address} />
                        <ErrorMessage name="address" component="span" />
                    </div>
                    
                    <div>
                        <label htmlFor="firstName">שם איש קשר :</label>
                        <Field id="firstName" name="firstName" placeholder="שם פרטי" onChange={(e) => {setFirstName(e.target.value)}} value={firstName} />
                        <ErrorMessage name="firstName" component="span" />
                    </div>

                    <div>
                        <label htmlFor="lastName">שם משפחה איש קשר : </label>
                        <Field id="lastName" name="lastName" placeholder=" שם משפחה איש קשר " onChange={(e) => {setLastName(e.target.value)}} value={lastName}/>
                        <ErrorMessage name="lastName" component="span" />
                    </div>

                    
                    <div>
                        <label htmlFor="gender">מין איש קשר: </label>
                        <Field as="select" id="gender" name="gender" onChange={(e) => {setGender(e.target.value)}} value={gender}>
                            <option value="">בחר מין</option>
                            <option value="Male">זכר</option>
                            <option value="Female">נקבה</option>
                            <option value="Other">אחר</option>
                        </Field>
                        <ErrorMessage name="gender" component="span" />
                    </div>

                    <div>
                        <label htmlFor="languages">שפה נחוצה (לא חובה)</label>
                        <Field as="select" id="language" name="language" onChange={(e) => {setLanguage(e.target.value)}} value={language}>
                            <option value="">שפות</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="language" component="span" />
                    </div>

                <div>
                  <label htmlFor="rooms"> מספר חדרים בבית: </label>
                  <Field as="select" id="rooms" name="rooms" onChange={(e) => {setRooms(e.target.value)}} value={rooms}>
                    <option value="">בחר מספר חדרים בבית</option>
                    
                    {Array.from({ length: 7 }, (_, index) => index + 2).map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="rooms" component="span" />
                </div>


                <div>
                  <label htmlFor="teamSize">  גודל קבוצה נחוץ: </label>
                  <Field as="select" id="teamSize" name="teamSize" onChange={(e) => {setTeamSize(e.target.value)}} value={teamSize}>
                    <option value="">בחר גודל קבוצה נחוץ</option>
                    
                    {Array.from({ length: 7 }, (_, index) => index + 2).map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="teamSize" component="span" />
                </div>

                <div>
                    <label htmlFor="comments"> הערות: </label>
                    <Field as="textarea" id="comments" name="comments" placeholder="הערות" onChange={(e) => {setComments(e.target.value)}} value={comments} />
                    <ErrorMessage name="comments" component="span" />
                </div>
               </>
              )}


              {(selectedCity && selectedNeighborhood) && (
                <div className='login_Buttons'>
                <button type="submit" onClick={onSubmit} className='button-login' >צור בית</button>
                </div>
              )}
            </Form>
          </Formik>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default AddHousePage;
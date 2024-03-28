import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import './css/AddHousePage.css';
import Nav from "./Nav";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DataContext from "../Helpers/DataContext";
import Footer from "./Footer";
import { IoChevronForwardCircle } from "react-icons/io5";
import { addHouse, fetchAllAreasGroupedByCity} from '../Helpers/StaffFrontLogic'

const AddHousePage = () => {
    const { user, navigate } = useContext(DataContext);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [address, setAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [language, setLanguage] = useState('');
    const [rooms, setRooms] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [comments, setComments] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [secondPhoneNumber, setSecondPhoneNumber] = useState('');
    const [areaList, setAreaList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false)
    const languages = ["עברית","ערבית","ספרדית","אמהרית","רוסית"]
    useEffect(() => {
      if(!(localStorage.getItem("accessToken"))){
        navigate('/404')
      }
    })
  const initialValues = {
    city: '',
    area: '',
    address: '',
    firstName: '',
    lastName: '',
    gender: '',
    language: '',
    rooms: '',
    teamSize: '',
    comments: '',
    phoneNumber: '',
    secondPhoneNumber: ''
  };

  const validationSchema = Yup.object().shape({
    city: Yup.string(),
    area: Yup.string(),
    address: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    gender: Yup.string(),
    language: Yup.string(),
    rooms: Yup.string(),
    teamSize: Yup.string(),
    comments: Yup.string(),
    phoneNumber: Yup.string()
        
        .matches(/^05\d{8}$/, "מספר לא תקין"),
    secondPhoneNumber: Yup.string()
        .matches(/^05\d{8}$/, "מספר לא תקין"),
  });

  const onSubmit = () => {
    setErrorMessage(false)
    const information = {
      city: selectedCity,
      area: selectedArea,
      address: address,
      residentFirstName: firstName,
      residentLastName: lastName,
      residentPhoneNum: phoneNumber,
      residentGender: gender,
      languageNeeded: language,
      numberOfRooms: rooms,
      membersNeeded: teamSize,
      freeText: comments,
      residentAlternatePhoneNum: secondPhoneNumber
    }
    if(gender && language && rooms && address && firstName && lastName && selectedCity && selectedArea && phoneNumber){
      const res = addHouse(information);
    if(res) {
      navigate('/My-Houses')
    }
    }
    else {
      setErrorMessage(true)
    }
    
  // Amiel - all the data you need are in the useStates. after you do whatever you need to do with the data
  // navigate back to "/My-Houses".
  // dont forget! after you place a city you need to give me all the neighborhoods. like in group page in school
  // the page works ! but the yup does problems with his warnings

  };

  const setAreas = async () => {
    const res = await fetchAllAreasGroupedByCity(selectedCity);
    setAreaList(res[selectedCity]);
  }

  useEffect(() => {
    setAreas();

  },[selectedCity])


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
         
          <div className='add-house-semi-title'>
            <h2>אנא מלא את הפרטים : </h2>
          </div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>

              


              {user.role === "Admin" && (
                <div>
                <label htmlFor="city"> עיר(*): </label>
                <Field as="select" id="city" name="city" onChange={(e) => {setSelectedCity(e.target.value)}} value={selectedCity}>
                  <option value="">בחר עיר</option>
                  <option value="JRS">ירושלים</option>
                  <option value="BSV">באר שבע</option>
                </Field>
                <ErrorMessage name="city" component="span" />
              </div>
              )}
              {(user.role === "CityManager" || user.role === "AreaManager"|| user.role === "TeamOwner" ) && (
                <div>
                <label htmlFor="city"> עיר(*): </label>
                <Field as="select" id="city" name="city" onChange={(e) => {setSelectedCity(e.target.value)}} value={selectedCity}>
                  <option value="">בחר עיר</option>
                  <option value={user.cityName}>{user.cityName}</option>

                </Field>
                <ErrorMessage name="city" component="span" />
              </div>
              )}

              {selectedCity && (
                <div>
                    <label htmlFor="area"> שכונה(*): </label>
                    <Field as="select" id="area" name="area" onChange={(e) => setSelectedArea(e.target.value)} value={selectedArea}>
                    <option value="">בחר שכונה</option>
                    {areaList && (
                        <>
                        {areaList.map((area) => (
                            <option key={area.areaName} value={area.areaName}>
                            {area.areaName}
                            </option>
                        ))}
                        </>
                    )}
                    </Field>
                    <ErrorMessage name="area" component="span" />
                </div>
                )}

              {(selectedCity && selectedArea) && (
               <>
                    <div>
                        <label htmlFor="address">כתובת(*):</label>
                        <Field id="address" name="address"  onChange={(e) => {setAddress(e.target.value)}} value={address} />
                        <ErrorMessage name="address" component="span" />
                    </div>
                    
                    <div>
                        <label htmlFor="firstName">שם איש קשר(*):</label>
                        <Field id="firstName" name="firstName"  onChange={(e) => {setFirstName(e.target.value)}} value={firstName} />
                        <ErrorMessage name="firstName" component="span" />
                    </div>

                    <div>
                        <label htmlFor="lastName">שם משפחה איש קשר(*): </label>
                        <Field id="lastName" name="lastName"  onChange={(e) => {setLastName(e.target.value)}} value={lastName}/>
                        <ErrorMessage name="lastName" component="span" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber"> מספר פלאפון(*): </label>
                        <Field id="phoneNumber" name="phoneNumber"  onChange={(e) => {setPhoneNumber(e.target.value)}} value={phoneNumber}/>
                        <ErrorMessage name="phoneNumber" component="span" />
                    </div>
                    <div>
                        <label htmlFor="secondPhoneNumber">   מספר  חלופי : </label>
                        <Field id="secondPhoneNumber" name="secondPhoneNumber"  onChange={(e) => {setSecondPhoneNumber(e.target.value)}} value={secondPhoneNumber}/>
                        <ErrorMessage name="secondPhoneNumber" component="span" />
                    </div>
                    
                    <div>
                        <label htmlFor="gender">מין איש קשר(*): </label>
                        <Field as="select" id="gender" name="gender" onChange={(e) => {setGender(e.target.value)}} value={gender}>
                            <option value="">בחר מין</option>
                            <option value="זכר">זכר</option>
                            <option value="נקבה">נקבה</option>
                            <option value="אחר">אחר</option>
                        </Field>
                        <ErrorMessage name="gender" component="span" />
                    </div>

                    <div>
                        <label htmlFor="languages">שפה נחוצה(*):</label>
                        <Field as="select" id="language" name="language" onChange={(e) => {setLanguage(e.target.value)}} value={language}>
                            <option value="">שפות</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="language" component="span" />
                    </div>

                <div>
                  <label htmlFor="rooms"> מספר חדרים בבית(*): </label>
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
                    <Field as="textarea" id="comments" name="comments"  onChange={(e) => {setComments(e.target.value)}} value={comments} />
                    <ErrorMessage name="comments" component="span" />
                </div>
               </>
              )}


              {(selectedCity && selectedArea) && (
                <>
                {errorMessage && 
                (<div className="error_msg" style={{color: "red" , margin: "auto"}}>
                  <p>חסר שדות חובה</p>
                </div>)}
                <div className='login_Buttons'>
                <button type="submit" onClick={onSubmit} className='button-login' >צור בית</button>
                </div>
                </>
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
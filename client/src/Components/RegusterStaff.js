import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./css/Register.css"
import DataContext from '../Helpers/DataContext';
import {fetchAllCities, registerStaff} from '../Helpers/StaffFrontLogic'
import ConfirmMessage from './ConfirmMessage';

function RegisterStaff() {
    const {navigate} = useContext(DataContext);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [areaList, setAreaList] = useState([])
    const [cityList, setCityList] = useState([])
    const [email, setEmail] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [showConfirmError, setShowConfirmError] = useState(false)

    const initialValues = {
        firstName: "",
        lastName: "",
        password: "",
        email:"", 
        phoneNumber: "",
        confirmPassword: "",
        gender: "",
    };

    

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("שם פרטי נדרש"),
        lastName: Yup.string().required("שם משפחה נדרש"),
        password: Yup.string()
        .required("סיסמה נדרשת")
        .matches(
        /^(?=.*\d).{8,}$/,
        "סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות"
        ),
        email: Yup.string().email("אימייל לא תקין").required("אימייל נדרש"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('אישור סיסמה נדרש או סיסמאות לא תואמות'),
        phoneNumber: Yup.string()
        .required("מספר נייד נדרש")
        .matches(/^05\d{8}$/, "מספר לא תקין"),
        gender: Yup.string().required("מגדר נדרש")
    });

    useEffect(() => {
        updateCityList();
    },[])

    const updateCityList = async () => {
        const res = await fetchAllCities();
        setCityList(res);
    }

    const onSubmit = async (data) => {
        data.city = selectedCity;
        data.area = selectedArea;
        data.role = selectedRole;

        const res = await registerStaff(data);
        if(res) {
            setShowConfirm(true);
        } else {
            setShowConfirmError(true);
        }
        
        // Yoav - this is the function where he submits the form. need back logic here.
        
       /*  setEmail(data.email)
        data.languages = [data.languages]
        axios.post("http://localhost:3001/api/auth/register_student", data)
            .then(response => {
                // If the response is successful (status 200), show confirmation
                setShowConfirm(true);
            })
            .catch(error => {
                // If there's an error in the response, show error
                setShowConfirmError(true);
            }); */
    };



    const changeCity = async (cityName) => {
        setSelectedCity(cityName)
        // Yoav - get all the areas from the city name.
    }

    return (
        <div className="formContainer">
            {!showConfirm && (
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div className='Title-Div'>
                    <h2>הרשמה למתנדב/ת</h2>
                    </div>
                    <div>
                        <label htmlFor="firstName">שם פרטי:</label>
                        <Field id="firstName" name="firstName"  />
                        <ErrorMessage name="firstName" component="span" />
                    </div>

                    <div>
                        <label htmlFor="lastName">שם משפחה: </label>
                        <Field id="lastName" name="lastName"  />
                        <ErrorMessage name="lastName" component="span" />
                    </div>
                    <div>
                        <label htmlFor="email">אימייל : </label>
                        <Field type="email" id="email" name="email"  />
                        <ErrorMessage name="email" component="span" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">מספר נייד : </label>
                        <Field  id="phoneNumber" name="phoneNumber"  />
                        <ErrorMessage name="phoneNumber" component="span" />
                    </div>
                    <div>
                        <label htmlFor="password">סיסמה: </label>
                        <Field type="password" id="password" name="password"  />
                        <ErrorMessage name="password" component="span" />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">אשר/י סיסמה: </label>
                        <Field type="password" id="confirmPassword" name="confirmPassword"  />
                        <ErrorMessage name="confirmPassword" component="span" />
                    </div>

                    <div>
                        <label htmlFor="gender">מין: </label>
                        <Field as="select" id="gender" name="gender">
                            <option value="">בחר מין</option>
                            <option value="זכר">זכר</option>
                            <option value="נקבה">נקבה</option>
                            <option value="אחר">אחר</option>
                        </Field>
                        <ErrorMessage name="gender" component="span" />
                    </div>

                    <div>
                      <label htmlFor="role"> תפקיד: </label>
                      <Field as="select" id="role" name="role" value={selectedRole} onChange={(e) => {setSelectedRole(e.target.value)}} >
                          <option value="">בחר תפקיד</option>
                          <option value="CityManager">מנהל עיר</option>
                          <option value="AreaManager">מנהל איזור</option>
                          <option value="TeamOwner">חניך גרעין</option>
                          
                      </Field>
                      <ErrorMessage name="role" component="span" />
                    </div>

                    <div>
                      <label htmlFor="city"> עיר: </label>
                      <Field as="select" id="city" name="city" value={selectedCity} onChange={(e) => {changeCity(e.target.value)}} >
                          <option value="">בחר עיר</option>
                          {cityList && (
                                <>
                                {cityList.map((city) => (
                                    <option key={city.cityName} value={city.cityName}>
                                    {city.cityName}
                                    </option>
                                ))}
                                </>
                            )}
                          {/* <option value="ירושלים">ירושלים</option>
                          <option value="באר שבע">באר שבע</option> */}
                      </Field>
                      <ErrorMessage name="city" component="span" />
                    </div>
                    {(selectedCity && selectedRole === 'AreaManager')  && <div>
                      <label htmlFor="area">  איזור: (למנהלי איזור בלבד) </label>
                      <Field as="select" id="area" name="area" value={selectedArea} onChange={(e) => {setSelectedArea(e.target.value)}}>
                          <option value="">בחר איזור : </option>
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
                    </div>}

     
                    <div className='Button-Div'>
                    <button type="submit" className='RegisterButton'>הירשם</button>
                    </div>

                   
                    
                </Form>
            </Formik>
            )}
            
        {showConfirm && (
        <ConfirmMessage
            title = {"...עוד צעד אחד קטן"}
            confirmationMessage={`נשלחה הודעת אישור לאימייל, אנא לחץ על הקישור דרך האימייל, נא לבדוק את הספאם ${email}\n`}
            handleConfirm={() => navigate('/')}
        />
      )}
        {showConfirmError && (
        <ConfirmMessage
            title = {"שגיאה"}
            confirmationMessage={`אחד או יותר מהשדות לא מאושרים ע"י המערכת, נסה להחליף אימייל או סיסמה`}
            handleConfirm={() => setShowConfirmError(false)}
        />
      )}
        </div>
    );
}

export default RegisterStaff;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./css/Register.css"
import DataContext from '../Helpers/DataContext';
import {fetchAllSchoolsByCityForRegister} from '../Helpers/StudentFrontLogic'

function Registration() {
    const {navigate} = useContext(DataContext);
    const [selectedCity, setSelectedCity] = useState('');
    const [schoolsList, setSchoolsList] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState('');

    const initialValues = {
        firstName: "",
        lastName: "",
        password: "",
        email:"", 
        phoneNumber: "",
        confirmPassword: "",
        gender: "",
        parentName: "",
        parentPhoneNumber: "",
        city: "",
        school: "",
        languages: "",

    };
    const schools = []
    const languages = ["ערבית","ספרדית","אמהרית","רוסית"]
    

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("שם פרטי נדרש"),
        lastName: Yup.string().required("שם משפחה נדרש"),
        password: Yup.string()
        .required("סיסמה נדרשת")
        .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות"
        ),
        email: Yup.string().email("אימייל לא תקין").required("אימייל נדרש"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('אישור סיסמה נדרש או סיסמאות לא תואמות'),
        phoneNumber: Yup.string()
        .required("מספר נייד נדרש")
        .matches(/^05\d{8}$/, "מספר לא תקין"),
        gender: Yup.string().required("מגדר נדרש"),
        parentName: Yup.string().required("שם הורה נדרש"),
        parentPhoneNumber: Yup.string()
        .required("מספר הורה נדרש")
        .matches(/^05\d{8}$/, "מספר לא תקין"),
        //city: Yup.string().required("עיר נדרשת"),
        school: Yup.string().required("בית ספר נדרש"),
        languages: Yup.string(),
    });

    const onSubmit = (data) => {
        data.city = selectedCity;
        console.log(data);
        data.languages = [data.languages]
        axios.post("https://garineiudi.org.il/api/auth/register_student", data).then(() => {
            navigate('/');
        });         
    };

    const handleCityChange = async (cityName) => {
        setSelectedCity(cityName);
        const res = await fetchAllSchoolsByCityForRegister(cityName);
        console.log(res);
        setSchoolsList(res);
    }

    return (
        <div className="formContainer">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div className='Title-Div'>
                    <h2>הרשמה</h2>
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
                        <label htmlFor="confirmPassword">אשר סיסמה: </label>
                        <Field type="password" id="confirmPassword" name="confirmPassword"  />
                        <ErrorMessage name="confirmPassword" component="span" />
                    </div>

                    <div>
                        <label htmlFor="gender">מין: </label>
                        <Field as="select" id="gender" name="gender">
                            <option value="">בחר מין</option>
                            <option value="Male">זכר</option>
                            <option value="Female">נקבה</option>
                            <option value="Other">אחר</option>
                        </Field>
                        <ErrorMessage name="gender" component="span" />
                    </div>

                    <div>
                        <label htmlFor="parentName">שם הורה: </label>
                        <Field id="parentName" name="parentName"  />
                        <ErrorMessage name="parentName" component="span" />
                    </div>

                    <div>
                        <label htmlFor="parentPhoneNumber">מספר פלאפון הורה: </label>
                        <Field id="parentPhoneNumber" name="parentPhoneNumber" />
                        <ErrorMessage name="parentPhoneNumber" component="span" />
                    </div>

                

                    <div>
                      <label htmlFor="city"> עיר: </label>
                      <Field as="select" id="city" name="city" value={selectedCity} onChange={(e) => {handleCityChange(e.target.value)}}>
                          <option value="">בחר עיר</option>
                          <option value="JRS">ירושלים</option>
                          <option value="BSV">באר שבע</option>
                      </Field>
                      <ErrorMessage name="school" component="span" />
                    </div>

                    {selectedCity && <div>
                      <label htmlFor="school">בית ספר: </label>
                      <Field as="select" id="school" name="school" >
                          <option value="">בחר בית ספר</option>
                          {schoolsList && (
                                <>
                                {schoolsList.map((school) => (
                                    <option key={school.schoolName} value={school.schoolName}>
                                    {school.schoolName}
                                    </option>
                                ))}
                                </>
                            )}
                      </Field>
                      <ErrorMessage name="school" component="span" />
                    </div>}

                    <div>
                        <label htmlFor="languages"> האם אתה דובר את אחת מהשפות הבאות? </label>
                        <Field as="select" id="languages" name="languages">
                            <option value="">שפות</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="languages" component="span" />
                    </div>
                    <div className='Button-Div'>
                    <button type="submit" className='RegisterButton'>הירשם</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;

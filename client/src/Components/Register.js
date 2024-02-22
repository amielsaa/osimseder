import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./css/Register.css"
import DataContext from '../Helpers/DataContext';

function Registration() {
    const {navigate} = useContext(DataContext);
    const initialValues = {
        firstName: "",
        lastName: "",
        password: "",
        email:"", 
        confirmPassword: "",
        gender: "",
        parentName: "",
        parentPhoneNumber: "",
        parentEmail: "",
        city: "",
        school: "",
        languages: "",
        issuesChoose: "Accessability", //not presented in the form
        issuesText: "", //not presented in the form
        phoneNumber: "0", //not presented in the form

    };
    const schools = []
    const languages = []
    

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
        gender: Yup.string().required("מגדר נדרש"),
        parentName: Yup.string().required("שם הורה נדרש"),
        parentPhoneNumber: Yup.string()
        .required("מספר הורה נדרש")
        .matches(/^05\d{8}$/, "מספר לא תקין"),
        parentEmail: Yup.string().email("אימייל לא תקין").required("אימייל הורה נדרש"),
        city: Yup.string().required("עיר נדרשת"),
        school: Yup.string().required("בית ספר נדרש"),
        languages: Yup.string().required("לפחות שפה אחת נדרשת"),
    });

    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3001/auth/register_student", data).then(() => {
            navigate('/');
        });         
    };

    return (
        <div className="formContainer">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div className='Title-Div'>
                    <h2>הרשמה</h2>
                    </div>
                    <div>
                        <label htmlFor="firstName">שם פרטי:</label>
                        <Field id="firstName" name="firstName" placeholder="שם פרטי" />
                        <ErrorMessage name="firstName" component="span" />
                    </div>

                    <div>
                        <label htmlFor="lastName">שם משפחה: </label>
                        <Field id="lastName" name="lastName" placeholder="שם משפחה" />
                        <ErrorMessage name="lastName" component="span" />
                    </div>
                    <div>
                        <label htmlFor="email">אימייל : </label>
                        <Field type="email" id="email" name="email" placeholder="אימייל " />
                        <ErrorMessage name="email" component="span" />
                    </div>
                    <div>
                        <label htmlFor="password">סיסמה: </label>
                        <Field type="password" id="password" name="password" placeholder="סיסמה" />
                        <ErrorMessage name="password" component="span" />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">אשר סיסמה: </label>
                        <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="אשר סיסמה" />
                        <ErrorMessage name="confirmPassword" component="span" />
                    </div>

                    <div>
                        <label htmlFor="gender">מגדר: </label>
                        <Field as="select" id="gender" name="gender">
                            <option value="">בחר מגדר</option>
                            <option value="Male">זכר</option>
                            <option value="Female">נקבה</option>
                            <option value="Other">אחר</option>
                        </Field>
                        <ErrorMessage name="gender" component="span" />
                    </div>

                    <div>
                        <label htmlFor="parentName">שם הורה: </label>
                        <Field id="parentName" name="parentName" placeholder="שם הורה" />
                        <ErrorMessage name="parentName" component="span" />
                    </div>

                    <div>
                        <label htmlFor="parentPhoneNumber">מספר פלאפון הורה: </label>
                        <Field id="parentPhoneNumber" name="parentPhoneNumber" placeholder="מספר פלאפון הורה" />
                        <ErrorMessage name="parentPhoneNumber" component="span" />
                    </div>

                    <div>
                        <label htmlFor="parentEmail">אימייל הורה: </label>
                        <Field type="email" id="parentEmail" name="parentEmail" placeholder="אימייל הורה" />
                        <ErrorMessage name="parentEmail" component="span" />
                    </div>

                    <div>
                      <label htmlFor="city"> עיר: </label>
                      <Field as="select" id="city" name="city">
                          <option value="">בחר עיר</option>
                          <option value="JRS">ירושלים</option>
                          <option value="BSV">באר שבע</option>
                      </Field>
                      <ErrorMessage name="school" component="span" />
                    </div>

                    <div>
                      <label htmlFor="school">בית ספר: </label>
                      <Field as="select" id="school" name="school">
                          <option value="">בחר בית ספר</option>
                          <option value="נתיבי עם">נתיבי עם</option>
                          <option value="SchoolTest1">רמבם</option>
                      </Field>
                      <ErrorMessage name="school" component="span" />
                    </div>

                    <div>
                        <label htmlFor="languages">שפת אם: </label>
                        <Field as="select" id="languages" name="languages">
                            <option value="">שפות</option>
                            <option value="English">אנגלית</option>
                            <option value="עברית">עברית</option>
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

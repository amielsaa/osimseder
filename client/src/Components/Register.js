import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./css/Register.css"

function Registration() {
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
        language: "",
    };
    const schools = []
    const languages = []
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("שם פרטי נדרש"),
        lastName: Yup.string().required("שם משפחה נדרש"),
        password: Yup.string()
        .required("סיסמה נדרשת")
        .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות"
        ),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('אישור סיסמה נדרש או סיסמאות לא תואמות'),
        gender: Yup.string().required("מגדר נדרש"),
        parentName: Yup.string().required("שם הורה נדרש"),
        parentPhoneNumber: Yup.string()
        .required("מספר הורה נדרש")
        .matches(/^05\d{8}$/, "מספר לא תקין"),
        email: Yup.string().email("אימייל לא תקין").required("אימייל נדרש"),
        parentEmail: Yup.string().email("אימייל לא תקין").required("אימייל הורה נדרש"),
        city: Yup.string().required("עיר נדרשת"),
        school: Yup.string().required("בית ספר נדרש"),
        language: Yup.string().required("לפחות שפה אחת נדרשת"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001", data).then(() => {
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
                        <label htmlFor="email">אימייל: </label>
                        <Field type="email" id="email" name="email" placeholder="אימייל" />
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
                            <option value="male">זכר</option>
                            <option value="female">נקבה</option>
                            <option value="other">אחר</option>
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
                          <option value="אשדוד">אשדוד</option>
                          <option value="באר שבע">באר שבע</option>
                      </Field>
                      <ErrorMessage name="school" component="span" />
                    </div>

                    <div>
                      <label htmlFor="school">בית ספר: </label>
                      <Field as="select" id="school" name="school">
                          <option value="">בחר בית ספר</option>
                          <option value="english">נתיבי עם</option>
                          <option value="spanish">רמבם</option>
                      </Field>
                      <ErrorMessage name="school" component="span" />
                    </div>

                    <div>
                        <label htmlFor="language">שפת אם: </label>
                        <Field as="select" id="languages" name="languages">
                            <option value="">שפות</option>
                            <option value="אנגלית">אנגלית</option>
                            <option value="עברית">עברית</option>
                            
                        </Field>
                        <ErrorMessage name="languages" component="span" />
                    </div>
                    <div className='Button-Div'>
                    <button type="submit">הירשם</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;

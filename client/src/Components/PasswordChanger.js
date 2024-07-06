import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './css/PasswordChanger.css';

// Validation schema




const PasswordChanger = ({ onClose, onSubmit, fromLoginPage }) => {


  const validationSchema = Yup.object({
    currentPassword: fromLoginPage ? Yup.string()  : Yup.string().required('שדה נדרש'),
    newPassword: Yup.string()
        .min(8, "סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות")
        .matches(/[a-z]/, "סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות")
        .matches(/[A-Z]/, "סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות")
        .matches(/\d/, '        "סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות"')
    .required('שדה נדרש'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'הסיסמאות חייבות להיות תואמות').required('שדה נדרש'),
  });
  

  // TODO ARI I CHANGED THE 4 LINES ABOVE TO THIS
   //   .min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים')
   // .matches(/[a-z]/, 'הסיסמה חייבת להכיל לפחות אות אחת קטנה')
   // .matches(/[A-Z]/, 'הסיסמה חייבת להכיל לפחות אות אחד גדולה')
   // .matches(/\d/, 'הסיסמה חייבת להכיל מספר')
   // if you want, just state the error above in a small box so the user will know what to do
   // and then put your suffisticated error message in the matches
    return (
    <div className="overlay-password-changer">
      <div className="confirmation-modal-password-changer">
        {!fromLoginPage && <button className="close-button" onClick={onClose}>X</button>}
        <h2>שינוי סיסמה</h2>
        <Formik
          initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            {!fromLoginPage && <div>
              <label htmlFor="currentPassword">סיסמה נוכחית</label>
              <Field name="currentPassword" type="password" />
              <ErrorMessage name="currentPassword" component="div" />
            </div>}
            <div>
              <label htmlFor="newPassword">סיסמה חדשה</label>
              <Field name="newPassword" type="password" />
              <ErrorMessage name="newPassword" component="div" />
            </div>
            <div>
              <label htmlFor="confirmNewPassword">אישור סיסמה חדשה</label>
              <Field name="confirmNewPassword" type="password" />
              <ErrorMessage name="confirmNewPassword" component="div" />
            </div>
            <div className='change-password-button-container'>
            <button type="submit" className="confirmation-button-change-password">
              שנה סיסמה
            </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PasswordChanger;

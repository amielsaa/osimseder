import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './css/PasswordChanger.css';

// Validation schema
const validationSchema = Yup.object({
  currentPassword: Yup.string().required('שדה נדרש'),
  newPassword: Yup.string()
  .min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים')
  .matches(/[a-z]/, 'הסיסמה חייבת להכיל לפחות אות אחת קטנה')
  .matches(/[A-Z]/, 'הסיסמה חייבת להכיל לפחות אות אחד גדולה')
  .matches(/\d/, 'הסיסמה חייבת להכיל מספר')
  .required('שדה נדרש'),
  confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'הסיסמאות חייבות להיות תואמות').required('שדה נדרש'),
});



const PasswordChanger = ({ onClose, onSubmit }) => {

  
  
  return (
    <div className="overlay-password-changer">
      <div className="confirmation-modal-password-changer">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>שינוי סיסמה</h2>
        <Formik
          initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <label htmlFor="currentPassword">סיסמה נוכחית</label>
              <Field name="currentPassword" type="password" />
              <ErrorMessage name="currentPassword" component="div" />
            </div>
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
